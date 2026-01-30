# Миграция на PostgreSQL + Prisma

## Когда нужно мигрировать?

Мигрируй на PostgreSQL когда:
- У тебя больше 100 карточек
- Больше 50 активных пользователей в день
- Нужна полноценная аналитика
- Нужна аутентификация

---

## Шаг 1: Установка Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

---

## Шаг 2: Создание схемы (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Entity {
  id                 String   @id @default(uuid())
  type               String   // 'place' | 'service' | 'specialist' | 'realtor'
  title              String
  short_description  String
  area               String
  address_text       String?
  geo_lat            Float?
  geo_lng            Float?
  contacts           Json     // Храним как JSON
  price_level        Int
  tags               String[]
  work_hours_text    String?
  trust_score        Int      @default(80)
  last_confirmed_at  DateTime @default(now())
  status             String   @default("active")
  created_at         DateTime @default(now())
  updated_at         DateTime @updatedAt
  created_by         String
  image_url          String?
  
  // Specialist fields
  languages          String[]
  rating             Float?
  specialization     String?
  
  // Relations
  signals            Signal[]
  
  @@index([type])
  @@index([area])
  @@index([status])
  @@index([trust_score])
}

model Signal {
  id         String   @id @default(uuid())
  entity_id  String
  type       String   // 'confirm' | 'report'
  reason     String?
  created_at DateTime @default(now())
  user_id    String?
  
  entity     Entity   @relation(fields: [entity_id], references: [id], onDelete: Cascade)
  
  @@index([entity_id])
  @@index([type])
}

model Guide {
  id                String   @id @default(uuid())
  title             String
  category          String
  content           String   @db.Text
  related_entities  String[]
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  
  @@index([category])
}

model User {
  id         String   @id @default(uuid())
  email      String   @unique
  language   String   @default("ru")
  favorites  String[]
  role       String   @default("user")
  created_at DateTime @default(now())
}
```

---

## Шаг 3: Подключение к БД

Добавь в `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/bali_explorer?schema=public"
```

Для разработки можешь использовать:
- **Supabase** (бесплатный PostgreSQL в облаке)
- **Render** (бесплатный tier с PostgreSQL)
- **Neon** (serverless PostgreSQL)

---

## Шаг 4: Миграция данных

Создай скрипт `scripts/migrate-data.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import initialData from '../data/db';

const prisma = new PrismaClient();

async function main() {
  console.log('Migrating entities...');
  
  for (const entity of initialData.entities) {
    await prisma.entity.create({
      data: {
        ...entity,
        contacts: entity.contacts as any,
      },
    });
  }

  console.log('Migrating guides...');
  
  for (const guide of initialData.guides) {
    await prisma.guide.create({
      data: guide,
    });
  }

  console.log('Done!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Запусти:

```bash
npx prisma db push
npx tsx scripts/migrate-data.ts
```

---

## Шаг 5: Обновить lib/db-service.ts

Замени на Prisma:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dbService = {
  getEntities: async (filters?) => {
    return prisma.entity.findMany({
      where: {
        status: { not: 'archived' },
        type: filters?.type,
        area: filters?.area,
        tags: filters?.tags ? { hasSome: filters.tags } : undefined,
        OR: filters?.search ? [
          { title: { contains: filters.search, mode: 'insensitive' } },
          { short_description: { contains: filters.search, mode: 'insensitive' } },
        ] : undefined,
      },
      orderBy: { trust_score: 'desc' },
    });
  },

  getEntity: async (id: string) => {
    return prisma.entity.findUnique({ where: { id } });
  },

  createEntity: async (data) => {
    return prisma.entity.create({ data });
  },

  updateEntity: async (id: string, data) => {
    return prisma.entity.update({
      where: { id },
      data: { ...data, updated_at: new Date() },
    });
  },

  // ... остальные методы
};
```

---

## Шаг 6: Полезные команды

```bash
# Применить изменения схемы
npx prisma db push

# Создать миграцию
npx prisma migrate dev --name init

# Открыть Prisma Studio (GUI для БД)
npx prisma studio

# Сбросить БД
npx prisma migrate reset
```

---

## Оценка времени

- Настройка: 30 минут
- Миграция данных: 1 час
- Тестирование: 2 часа
- **Итого: ~3-4 часа**

---

## Что даст миграция?

✅ **Скорость**: Запросы в 10+ раз быстрее
✅ **Масштабируемость**: До миллионов записей
✅ **Безопасность**: Транзакции, constraints
✅ **Full-text search**: Мощный поиск по тексту
✅ **Аналитика**: Сложные запросы за секунды

---

## Альтернативы PostgreSQL

1. **MySQL** - если уже есть опыт
2. **MongoDB** - если нужна гибкая схема
3. **SQLite** - для очень маленьких проектов

Но PostgreSQL - лучший выбор для проекта такого масштаба.

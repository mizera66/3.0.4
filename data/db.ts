// data/db.ts - Mock database (in-memory storage for MVP)
// Will be replaced with PostgreSQL in production

export interface Entity {
  id: string;
  type: 'place' | 'service' | 'specialist' | 'realtor';
  title: string;
  short_description: string;
  area: string;
  address_text?: string;
  geo_lat?: number;
  geo_lng?: number;
  contacts: {
    whatsapp?: string;
    phone?: string;
    instagram?: string;
    website?: string;
    telegram?: string;
  };
  price_level: 1 | 2 | 3 | 4;
  tags: string[];
  rating: number; // Average rating 0-5
  rating_count: number; // Number of ratings
  last_confirmed_at: string;
  status: 'active' | 'unverified' | 'flagged' | 'archived';
  created_at: string;
  updated_at: string;
  created_by: string;
  image_url?: string;
  gallery?: string[]; // Additional preview images (3 max)
  languages?: string[];
  specialization?: string;
  work_hours_text?: string;
  work_hours?: {
    monday?: { open: string; close: string; closed?: boolean };
    tuesday?: { open: string; close: string; closed?: boolean };
    wednesday?: { open: string; close: string; closed?: boolean };
    thursday?: { open: string; close: string; closed?: boolean };
    friday?: { open: string; close: string; closed?: boolean };
    saturday?: { open: string; close: string; closed?: boolean };
    sunday?: { open: string; close: string; closed?: boolean };
  };
}

export const entities: Entity[] = [
  // BIKE RENTALS
  {
    id: 'bike-1',
    type: 'service' as const,
    title: 'Bali Bike Rental Canggu',
    short_description: 'Аренда скутеров и мотоциклов. Доставка бесплатно. От 50k/день.',
    area: 'Чангу',
    address_text: 'Jl. Pantai Berawa 45, Canggu',
    geo_lat: -8.6478,
    geo_lng: 115.1395,
    contacts: {
      whatsapp: '+6281234567801',
      phone: '+6281234567801',
      instagram: '@balibike',
    },
    price_level: 2,
    tags: ['Аренда байков', 'Доставка', 'Скутеры'],
    rating: 4.5,
    rating_count: 45,
    last_confirmed_at: '2025-01-20T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2025-01-20T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80',
    ],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'bike-2',
    type: 'service' as const,
    title: 'Quick Scooter Seminyak',
    short_description: 'Быстрая аренда. Новые байки 2024. Страховка включена.',
    area: 'Семиньяк',
    address_text: 'Jl. Sunset Road 88, Seminyak',
    geo_lat: -8.6905,
    geo_lng: 115.1635,
    contacts: {
      whatsapp: '+6281234567802',
      phone: '+6281234567802',
    },
    price_level: 2,
    tags: ['Аренда байков', 'Страховка', 'Новые'],
    rating: 4.6,
    rating_count: 32,
    last_confirmed_at: '2025-01-22T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-11-15T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'bike-3',
    type: 'service' as const,
    title: 'Ubud Bike Station',
    short_description: 'Аренда в центре Убуда. Automatic коробки. 24/7.',
    area: 'Убуд',
    address_text: 'Jl. Monkey Forest, Ubud',
    geo_lat: -8.5069,
    geo_lng: 115.2625,
    contacts: {
      whatsapp: '+6281234567803',
      phone: '+6281234567803',
    },
    price_level: 2,
    tags: ['Аренда байков', '24/7', 'Убуд'],
    rating: 4.4,
    rating_count: 28,
    last_confirmed_at: '2025-01-18T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-10-20T00:00:00Z',
    updated_at: '2025-01-18T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },

  // VISAS
  {
    id: 'visa-1',
    type: 'service' as const,
    title: 'Bali Visa Center',
    short_description: 'Помощь с визами B211, KITAS. Быстро и надежно.',
    area: 'Чангу',
    address_text: 'Jl. Batu Bolong 77, Canggu',
    geo_lat: -8.6467,
    geo_lng: 115.1384,
    contacts: {
      whatsapp: '+6281234567804',
      phone: '+6281234567804',
      telegram: '@balivisacenter',
    },
    price_level: 3,
    tags: ['Визы', 'B211', 'KITAS'],
    rating: 4.7,
    rating_count: 56,
    last_confirmed_at: '2025-01-26T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2025-01-26T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'visa-2',
    type: 'service' as const,
    title: 'Easy Visa Bali',
    short_description: 'Визаран в Сингапур. Оформление B211. Консультации.',
    area: 'Семиньяк',
    address_text: 'Jl. Kayu Aya 12, Seminyak',
    geo_lat: -8.6831,
    geo_lng: 115.1663,
    contacts: {
      whatsapp: '+6281234567805',
      phone: '+6281234567805',
    },
    price_level: 2,
    tags: ['Визы', 'Визаран', 'Консультации'],
    rating: 4.5,
    rating_count: 44,
    last_confirmed_at: '2025-01-24T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-09-10T00:00:00Z',
    updated_at: '2025-01-24T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'visa-3',
    type: 'service' as const,
    title: 'Nomad Visa Hub',
    short_description: 'Специализируемся на визах для диджитал-номадов.',
    area: 'Убуд',
    address_text: 'Jl. Raya Ubud 45, Ubud',
    geo_lat: -8.5092,
    geo_lng: 115.2631,
    contacts: {
      whatsapp: '+6281234567806',
      phone: '+6281234567806',
      website: 'https://nomadvisahub.com',
    },
    price_level: 3,
    tags: ['Визы', 'Для номадов', 'Удаленка'],
    rating: 4.8,
    rating_count: 67,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-07-20T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },

  // SPA & MASSAGE
  {
    id: 'spa-1',
    type: 'place' as const,
    title: 'Zen Spa Ubud',
    short_description: 'Традиционный балийский массаж. Вид на джунгли.',
    area: 'Убуд',
    address_text: 'Jl. Raya Tegallalang, Ubud',
    geo_lat: -8.4338,
    geo_lng: 115.2807,
    contacts: {
      whatsapp: '+6281234567807',
      phone: '+6281234567807',
    },
    price_level: 3,
    tags: ['Spa', 'Массаж', 'Убуд'],
    rating: 4.9,
    rating_count: 124,
    last_confirmed_at: '2025-01-26T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-05-10T00:00:00Z',
    updated_at: '2025-01-26T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'],
    work_hours: {
      monday: { open: '10:00', close: '21:00' },
      tuesday: { open: '10:00', close: '21:00' },
      wednesday: { open: '10:00', close: '21:00' },
      thursday: { open: '10:00', close: '21:00' },
      friday: { open: '10:00', close: '21:00' },
      saturday: { open: '10:00', close: '21:00' },
      sunday: { open: '10:00', close: '21:00' },
    },
  },
  {
    id: 'spa-2',
    type: 'place' as const,
    title: 'Ocean Spa Seminyak',
    short_description: 'Spa на берегу океана. Звук волн.',
    area: 'Семиньяк',
    address_text: 'Jl. Camplung Tanduk, Seminyak',
    geo_lat: -8.6921,
    geo_lng: 115.1677,
    contacts: {
      whatsapp: '+6281234567808',
      phone: '+6281234567808',
    },
    price_level: 4,
    tags: ['Spa', 'На пляже', 'Премиум'],
    rating: 4.8,
    rating_count: 98,
    last_confirmed_at: '2025-01-24T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-08-05T00:00:00Z',
    updated_at: '2025-01-24T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'spa-3',
    type: 'place' as const,
    title: 'Budget Massage Kuta',
    short_description: 'Качественный массаж по доступным ценам. От 100k/час.',
    area: 'Кута',
    address_text: 'Jl. Legian 156, Kuta',
    geo_lat: -8.7184,
    geo_lng: 115.1687,
    contacts: {
      whatsapp: '+6281234567809',
      phone: '+6281234567809',
    },
    price_level: 1,
    tags: ['Массаж', 'Недорого', 'Кута'],
    rating: 4.3,
    rating_count: 76,
    last_confirmed_at: '2025-01-22T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-09-15T00:00:00Z',
    updated_at: '2025-01-22T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },

  // CAFES
  {
    id: 'cafe-1',
    type: 'place' as const,
    title: 'Green Bowl Ubud',
    short_description: 'Здоровое питание, смузи-боулы, веганские опции.',
    area: 'Убуд',
    address_text: 'Jl. Hanoman 48, Ubud',
    geo_lat: -8.5167,
    geo_lng: 115.2612,
    contacts: {
      whatsapp: '+6281234567810',
      phone: '+6281234567810',
      instagram: '@greenbowlubud',
    },
    price_level: 2,
    tags: ['Кафе', 'Здоровое питание', 'Веган'],
    rating: 4.6,
    rating_count: 87,
    last_confirmed_at: '2025-01-26T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-08-18T00:00:00Z',
    updated_at: '2025-01-26T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'cafe-2',
    type: 'place' as const,
    title: 'Sunset Warung Canggu',
    short_description: 'Аутентичная индонезийская кухня. Закаты с видом на океан.',
    area: 'Чангу',
    address_text: 'Jl. Pantai Berawa, Canggu',
    geo_lat: -8.6394,
    geo_lng: 115.1342,
    contacts: {
      whatsapp: '+6281234567811',
      phone: '+6281234567811',
    },
    price_level: 1,
    tags: ['Кафе', 'Индонезийская кухня', 'Закат'],
    rating: 4.7,
    rating_count: 156,
    last_confirmed_at: '2025-01-25T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-05-22T00:00:00Z',
    updated_at: '2025-01-25T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'cafe-3',
    type: 'place' as const,
    title: 'Pizza Paradise Seminyak',
    short_description: 'Настоящая итальянская пицца на дровах.',
    area: 'Семиньяк',
    address_text: 'Jl. Oberoi 77, Seminyak',
    geo_lat: -8.6883,
    geo_lng: 115.1642,
    contacts: {
      whatsapp: '+6281234567812',
      phone: '+6281234567812',
      website: 'https://pizzaparadise.com',
    },
    price_level: 3,
    tags: ['Ресторан', 'Итальянская кухня', 'Пицца'],
    rating: 4.8,
    rating_count: 203,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-04-10T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },

  // MEDICAL
  {
    id: 'doc-1',
    type: 'specialist' as const,
    title: 'Dr. Анна Петрова - Стоматолог',
    short_description: 'Русскоязычный стоматолог. Все виды лечения.',
    area: 'Семиньяк',
    address_text: 'Bali Dental Clinic, Jl. Sunset Road',
    geo_lat: -8.6842,
    geo_lng: 115.1698,
    contacts: {
      whatsapp: '+6281234567813',
      phone: '+6281234567813',
      telegram: '@drpetrovadent',
    },
    price_level: 3,
    tags: ['Медицина', 'Стоматолог', 'Русскоязычный'],
    languages: ['Русский', 'English'],
    specialization: 'Стоматология',
    rating: 4.9,
    rating_count: 78,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-07-08T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'doc-2',
    type: 'specialist' as const,
    title: 'Dr. Made Wijaya - Терапевт',
    short_description: 'Семейный врач. Прием на дому.',
    area: 'Чангу',
    address_text: 'Canggu Clinic, Jl. Batu Bolong',
    geo_lat: -8.6501,
    geo_lng: 115.1389,
    contacts: {
      whatsapp: '+6281234567814',
      phone: '+6281234567814',
    },
    price_level: 2,
    tags: ['Медицина', 'Терапевт', 'На дому'],
    languages: ['English', 'Indonesian'],
    specialization: 'Терапия',
    rating: 4.6,
    rating_count: 52,
    last_confirmed_at: '2025-01-25T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-08-20T00:00:00Z',
    updated_at: '2025-01-25T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'doc-3',
    type: 'specialist' as const,
    title: 'Dr. Alex Novikov - Психолог',
    short_description: 'Психологическая помощь онлайн и очно.',
    area: 'Убуд',
    contacts: {
      whatsapp: '+6281234567815',
      phone: '+6281234567815',
      telegram: '@drnovikov',
    },
    price_level: 3,
    tags: ['Медицина', 'Психолог', 'Онлайн'],
    languages: ['Русский', 'English'],
    specialization: 'Психология',
    rating: 4.9,
    rating_count: 112,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-04-25T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },

  // EXCURSIONS
  {
    id: 'tour-1',
    type: 'service' as const,
    title: 'Sunrise Volcano Trekking',
    short_description: 'Восход на вулкане Батур. Старт в 2 ночи.',
    area: 'Кинтамани',
    geo_lat: -8.2421,
    geo_lng: 115.3755,
    contacts: {
      whatsapp: '+6281234567816',
      phone: '+6281234567816',
    },
    price_level: 2,
    tags: ['Экскурсии', 'Треккинг', 'Вулкан'],
    rating: 4.8,
    rating_count: 234,
    last_confirmed_at: '2025-01-26T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2025-01-26T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'tour-2',
    type: 'service' as const,
    title: 'Snorkeling Nusa Penida',
    short_description: 'Снорклинг с мантами. Трансфер включен.',
    area: 'Нуса Пенида',
    geo_lat: -8.7290,
    geo_lng: 115.5447,
    contacts: {
      whatsapp: '+6281234567817',
      phone: '+6281234567817',
    },
    price_level: 3,
    tags: ['Экскурсии', 'Снорклинг', 'Манты'],
    rating: 4.9,
    rating_count: 187,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-05-05T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'tour-3',
    type: 'service' as const,
    title: 'ATV Jungle Adventure',
    short_description: 'Экстремальная поездка на квадроциклах по джунглям.',
    area: 'Убуд',
    geo_lat: -8.4932,
    geo_lng: 115.2744,
    contacts: {
      whatsapp: '+6281234567818',
      phone: '+6281234567818',
    },
    price_level: 3,
    tags: ['Экскурсии', 'ATV', 'Экстрим'],
    rating: 4.7,
    rating_count: 198,
    last_confirmed_at: '2025-01-26T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-06-08T00:00:00Z',
    updated_at: '2025-01-26T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },

  // SPECIALISTS
  {
    id: 'spec-1',
    type: 'specialist' as const,
    title: 'Мария Иванова - Йога инструктор',
    short_description: 'Частные уроки йоги. Хатха, виньяса.',
    area: 'Чангу',
    contacts: {
      whatsapp: '+6281234567819',
      phone: '+6281234567819',
      instagram: '@mariayogabali',
    },
    price_level: 2,
    tags: ['Специалисты', 'Йога', 'Фитнес'],
    languages: ['Русский', 'English'],
    specialization: 'Йога',
    rating: 4.9,
    rating_count: 87,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-04-15T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'spec-2',
    type: 'specialist' as const,
    title: 'John Smith - Surf Instructor',
    short_description: 'Обучение сёрфингу для начинающих и продвинутых.',
    area: 'Кута',
    address_text: 'Kuta Beach area',
    geo_lat: -8.7185,
    geo_lng: 115.1692,
    contacts: {
      whatsapp: '+6281234567820',
      phone: '+6281234567820',
    },
    price_level: 2,
    tags: ['Специалисты', 'Сёрфинг', 'Обучение'],
    languages: ['English', 'Indonesian'],
    specialization: 'Сёрфинг',
    rating: 4.8,
    rating_count: 167,
    last_confirmed_at: '2025-01-26T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-03-20T00:00:00Z',
    updated_at: '2025-01-26T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'spec-3',
    type: 'specialist' as const,
    title: 'Анна Соколова - Фотограф',
    short_description: 'Фотосессии на Бали. Портреты, свадьбы, family.',
    area: 'Убуд',
    contacts: {
      whatsapp: '+6281234567821',
      phone: '+6281234567821',
      telegram: '@annaphotobali',
      website: 'https://annasokolova.photo',
    },
    price_level: 3,
    tags: ['Специалисты', 'Фотограф', 'Фотосессия'],
    languages: ['Русский', 'English'],
    specialization: 'Фотография',
    rating: 4.9,
    rating_count: 124,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-05-08T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },

  // REALTORS
  {
    id: 'realtor-1',
    type: 'realtor' as const,
    title: 'Екатерина Смирнова - Агент по недвижимости',
    short_description: 'Помогу найти виллу для долгосрочной аренды.',
    area: 'Чангу',
    contacts: {
      whatsapp: '+6281234567822',
      phone: '+6281234567822',
      telegram: '@ekaterinarealestate',
    },
    price_level: 2,
    tags: ['Недвижимость', 'Долгосрок', 'Виллы'],
    languages: ['Русский', 'English'],
    specialization: 'Недвижимость',
    rating: 4.7,
    rating_count: 54,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-08-01T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'realtor-2',
    type: 'realtor' as const,
    title: 'Luxury Villas Bali',
    short_description: 'Эксклюзивные виллы премиум-класса.',
    area: 'Нуса Дуа',
    contacts: {
      whatsapp: '+6281234567823',
      phone: '+6281234567823',
      website: 'https://luxuryvillasbali.com',
    },
    price_level: 4,
    tags: ['Недвижимость', 'Премиум', 'Люкс'],
    languages: ['English', 'Russian'],
    specialization: 'Недвижимость',
    rating: 4.9,
    rating_count: 45,
    last_confirmed_at: '2025-01-27T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-04-05T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
  {
    id: 'realtor-3',
    type: 'realtor' as const,
    title: 'Budget Stays Bali',
    short_description: 'Бюджетное жилье для номадов. Гестхаусы, комнаты.',
    area: 'Чангу',
    contacts: {
      whatsapp: '+6281234567824',
      phone: '+6281234567824',
      telegram: '@budgetstaysbali',
    },
    price_level: 1,
    tags: ['Недвижимость', 'Бюджет', 'Для номадов'],
    languages: ['English', 'Russian'],
    specialization: 'Недвижимость',
    rating: 4.4,
    rating_count: 128,
    last_confirmed_at: '2025-01-24T00:00:00Z',
    status: 'active' as const,
    created_at: '2024-10-08T00:00:00Z',
    updated_at: '2025-01-24T00:00:00Z',
    created_by: 'system',
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    work_hours: {
      monday: { open: '09:00', close: '20:00' },
      tuesday: { open: '09:00', close: '20:00' },
      wednesday: { open: '09:00', close: '20:00' },
      thursday: { open: '09:00', close: '20:00' },
      friday: { open: '09:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '10:00', close: '18:00' },
    },
  },
];

export interface Guide {
  id: string;
  title: string;
  category: string;
  content: string;
  related_entities: string[];
  created_at: string;
  updated_at: string;
}

export interface Signal {
  id: string;
  entity_id: string;
  type: 'confirm' | 'report';
  created_at: string;
  ip_address?: string;
}

export interface Comment {
  id: string;
  entity_id: string;
  rating: number; // 1-5
  text: string;
  author: string; // Name or "Аноним"
  created_at: string;
  ip_address?: string; // For spam protection
}

export const guides: Guide[] = [
  {
    id: 'guide-1',
    title: 'Первые шаги на Бали',
    category: 'Для новичков',
    content: `# Первые шаги на Бали

## Виза
Для россиян доступна виза по прилету (VOA) на 30 дней за $35. Можно продлить еще на 30 дней.

Для долгосрока нужна B211 виза - дает право находиться до 180 дней.

## Жилье
- **Чангу** - для сёрферов и диджитал-номадов
- **Убуд** - для йоги и спокойствия
- **Семиньяк** - для вечеринок и пляжей
- **Санур** - для семей с детьми

## Транспорт
Самый популярный - аренда скутера (50-70k/день). Нужны права категории А.

## Бюджет
- Минимум: $800-1000/месяц
- Комфорт: $1500-2000/месяц
- Премиум: $3000+/месяц`,
    related_entities: ['bike-1', 'visa-1', 'realtor-1'],
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
  },
  {
    id: 'guide-2',
    title: 'Где поесть на Бали',
    category: 'Еда',
    content: `# Где поесть на Бали

## Варунги (местные кафе)
Самая дешевая еда - 20-40k за блюдо. Наси горенг, ми горенг, гадо-гадо.

## Европейская кухня
В Чангу и Семиньяке полно кафе с европейской едой. Завтрак 80-150k.

## Здоровое питание
Убуд - столица веган-кафе и смузи-боулов. Green Bowl, Alchemy, Clear Cafe.

## Морепродукты
В Джимбаране на пляже готовят свежайшие морепродукты на гриле.

## Бюджет на еду
- Варунги: $5-7/день
- Европейская еда: $15-25/день
- Премиум: $40+/день`,
    related_entities: ['cafe-1', 'cafe-2', 'cafe-3'],
    created_at: '2024-12-05T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
  },
  {
    id: 'guide-3',
    title: 'Лучшие пляжи Бали',
    category: 'Пляжи',
    content: `# Лучшие пляжи Бали

## Для сёрфинга
- **Echo Beach (Чангу)** - волны для начинающих и продвинутых
- **Uluwatu** - для опытных сёрферов
- **Padang Padang** - красивый пляж, волны средней сложности

## Для купания
- **Санур** - спокойное море, отлично для детей
- **Нуса Дуа** - чистые пляжи, инфраструктура
- **Amed** - черный вулканический песок

## Для инсты
- **Kelingking Beach (Nusa Penida)** - знаменитый вид на скалу-динозавра
- **Green Bowl Beach** - секретный пляж с пещерами
- **Balangan Beach** - красные скалы и закаты

## Совет
Арендуй скутер и исследуй разные пляжи. Каждый уникален!`,
    related_entities: ['tour-1', 'tour-2', 'spec-2'],
    created_at: '2024-12-10T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
  },
  {
    id: 'guide-4',
    title: 'Визы и документы',
    category: 'Визы',
    content: `# Визы и документы

## VOA (Visa on Arrival)
- **Срок:** 30 дней + продление на 30
- **Цена:** $35 + $35 за продление
- **Где:** В аэропорту

## B211 (Social/Cultural Visa)
- **Срок:** 60 дней + 4 продления по 60 = 300 дней
- **Цена:** ~$150-200 через агентство
- **Документы:** Спонсорское письмо

## KITAS (рабочая виза)
- **Срок:** 1-2 года
- **Цена:** $1500-3000
- **Для кого:** Если работаешь на индонезийскую компанию

## Визаран
Выезд в Сингапур/Куала-Лумпур на 1-3 дня, возврат с новой визой.

## Важно
Не работай на туристической визе - это нелегально!`,
    related_entities: ['visa-1', 'visa-2', 'visa-3'],
    created_at: '2024-12-15T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
  },
  {
    id: 'guide-5',
    title: 'Аренда жилья на Бали',
    category: 'Недвижимость',
    content: `# Аренда жилья на Бали

## Где искать
- **Facebook группы** - Bali Long Term Rental
- **Airbnb** - для первого месяца
- **Агенты** - берут комиссию, но экономят время

## Цены (долгосрок, месяц)
- **Комната:** $200-400
- **Студия:** $400-700
- **Вилла 1 спальня:** $600-1200
- **Вилла 2-3 спальни:** $1200-3000+

## Что проверить
- Кондиционер работает?
- Вода горячая?
- Интернет быстрый? (тест на speedtest.net)
- Есть ли стиралка?
- Включены ли коммуналка?

## Депозит
Обычно 1-2 месяца. Возвращается при выезде.

## Контракт
Всегда подписывай контракт! Даже на месяц.`,
    related_entities: ['realtor-1', 'realtor-2', 'realtor-3'],
    created_at: '2024-12-20T00:00:00Z',
    updated_at: '2025-01-27T00:00:00Z',
  },
];

// Database structure for db-service
export interface Database {
  entities: Entity[];
  guides: Guide[];
  signals: Signal[];
}

// Default export for db-service compatibility
const database: Database = {
  entities,
  guides,
  signals: [], // Empty signals array for MVP
};

export default database;

// Default comments for MVP (one per entity)
export const defaultComments: Comment[] = [
  // BIKE RENTALS
  { id: 'c1', entity_id: 'bike-1', rating: 5, text: 'Отличный сервис! Байки новые, доставили прямо в отель. Рекомендую!', author: 'Дмитрий', created_at: '2025-01-20T10:30:00Z' },
  { id: 'c2', entity_id: 'bike-2', rating: 4, text: 'Хорошие скутеры, страховка включена. Минус балл за небольшую царапину на байке.', author: 'Анна', created_at: '2025-01-22T14:15:00Z' },
  { id: 'c3', entity_id: 'bike-3', rating: 5, text: 'Круглосуточная работа - это огромный плюс! Арендовал в 2 ночи, все быстро.', author: 'Александр', created_at: '2025-01-18T22:45:00Z' },
  
  // VISAS
  { id: 'c4', entity_id: 'visa-1', rating: 5, text: 'Профессионалы! Сделали B211 за 3 дня. Все объяснили, помогли с документами.', author: 'Екатерина', created_at: '2025-01-25T09:20:00Z' },
  { id: 'c5', entity_id: 'visa-2', rating: 4, text: 'Организовали визаран в Сингапур. Цена чуть выше рынка, но все прошло гладко.', author: 'Михаил', created_at: '2025-01-24T16:30:00Z' },
  { id: 'c6', entity_id: 'visa-3', rating: 5, text: 'Специализируются на номадах - понимают все нюансы. Получил визу на 6 месяцев!', author: 'Андрей', created_at: '2025-01-27T11:00:00Z' },
  
  // SPA & MASSAGE
  { id: 'c7', entity_id: 'spa-1', rating: 5, text: 'Волшебное место! Массаж с видом на рисовые террасы. Расслабляет на 100%.', author: 'Ольга', created_at: '2025-01-26T17:45:00Z' },
  { id: 'c8', entity_id: 'spa-2', rating: 5, text: 'Спа на пляже - это нечто! Звук волн + профессиональный массаж = рай.', author: 'Мария', created_at: '2025-01-24T13:20:00Z' },
  { id: 'c9', entity_id: 'spa-3', rating: 4, text: 'За свои деньги очень достойно! Массаж хороший, интерьер простой но чистый.', author: 'Анонім', created_at: '2025-01-22T19:10:00Z' },
  
  // CAFES
  { id: 'c10', entity_id: 'cafe-1', rating: 5, text: 'Лучшие смузи-боулы на Бали! Все свежее, порции большие, атмосфера уютная.', author: 'Виктория', created_at: '2025-01-26T08:30:00Z' },
  { id: 'c11', entity_id: 'cafe-2', rating: 5, text: 'Аутентичная индонезийская кухня по местным ценам. Закаты просто бомба!', author: 'Сергей', created_at: '2025-01-25T20:15:00Z' },
  { id: 'c12', entity_id: 'cafe-3', rating: 5, text: 'Настоящая итальянская пицца! Тесто на дровах, ингредиенты качественные.', author: 'Антон', created_at: '2025-01-27T19:40:00Z' },
  
  // MEDICAL
  { id: 'c13', entity_id: 'doc-1', rating: 5, text: 'Профессиональный стоматолог! Все на русском, современное оборудование.', author: 'Ирина', created_at: '2025-01-27T15:20:00Z' },
  { id: 'c14', entity_id: 'doc-2', rating: 5, text: 'Приехал на дом, осмотрел ребенка, выписал лекарства. Очень помог!', author: 'Елена', created_at: '2025-01-25T10:45:00Z' },
  { id: 'c15', entity_id: 'doc-3', rating: 5, text: 'Отличный психолог! Работает онлайн, очень помогли сессии. Рекомендую.', author: 'Анонім', created_at: '2025-01-27T14:00:00Z' },
  
  // EXCURSIONS
  { id: 'c16', entity_id: 'tour-1', rating: 5, text: 'Незабываемый рассвет на вулкане! Гид классный, группа небольшая. Must do!', author: 'Павел', created_at: '2025-01-26T06:30:00Z' },
  { id: 'c17', entity_id: 'tour-2', rating: 5, text: 'Видели мант! Невероятные ощущения. Трансфер, снаряжение, обед - все включено.', author: 'Юлия', created_at: '2025-01-27T18:20:00Z' },
  { id: 'c18', entity_id: 'tour-3', rating: 4, text: 'Экстремально и весело! Квадроциклы мощные, трасса интересная. Грязи будет много)', author: 'Денис', created_at: '2025-01-26T16:50:00Z' },
  
  // SPECIALISTS
  { id: 'c19', entity_id: 'spec-1', rating: 5, text: 'Прекрасный инструктор! Йога на закате, индивидуальный подход. Очень довольна.', author: 'Наталья', created_at: '2025-01-27T18:15:00Z' },
  { id: 'c20', entity_id: 'spec-2', rating: 5, text: 'За неделю научился стоять на доске! Джон терпеливый и веселый. Супер!', author: 'Игорь', created_at: '2025-01-26T12:40:00Z' },
  { id: 'c21', entity_id: 'spec-3', rating: 5, text: 'Потрясающие фотографии! Анна нашла идеальные локации, очень творческий подход.', author: 'Кристина', created_at: '2025-01-27T16:25:00Z' },
  
  // REALTORS
  { id: 'c22', entity_id: 'realtor-1', rating: 5, text: 'Помогла найти виллу за 3 дня! Профессионал, знает все нюансы аренды на Бали.', author: 'Владимир', created_at: '2025-01-27T10:15:00Z' },
  { id: 'c23', entity_id: 'realtor-2', rating: 4, text: 'Шикарные виллы, но дорого. Сервис на высоте, есть из чего выбрать.', author: 'Анонім', created_at: '2025-01-27T14:30:00Z' },
  { id: 'c24', entity_id: 'realtor-3', rating: 5, text: 'Отличный вариант для бюджетного жилья! Нашли комнату за $300, чисто и близко к пляжу.', author: 'Олег', created_at: '2025-01-24T09:50:00Z' },
];

// lib/workHours.ts - Working hours utilities

import { Entity } from '@/data/db';

export function isOpenNow(entity: Entity): boolean | null {
  if (!entity.work_hours) return null;

  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDay = dayNames[now.getDay()] as keyof typeof entity.work_hours;
  
  const todayHours = entity.work_hours[currentDay];
  if (!todayHours || todayHours.closed) return false;

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMin] = todayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
  
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  return currentTime >= openTime && currentTime < closeTime;
}

export function getOpenStatus(entity: Entity): string {
  const open = isOpenNow(entity);
  if (open === null) return '';
  return open ? 'Открыто' : 'Закрыто';
}

export function getOpenStatusColor(entity: Entity): string {
  const open = isOpenNow(entity);
  if (open === null) return '';
  return open ? 'text-green-600' : 'text-red-600';
}

export function formatWorkHours(entity: Entity): string {
  if (!entity.work_hours) return '';

  const days = [
    { key: 'monday', label: 'Пн' },
    { key: 'tuesday', label: 'Вт' },
    { key: 'wednesday', label: 'Ср' },
    { key: 'thursday', label: 'Чт' },
    { key: 'friday', label: 'Пт' },
    { key: 'saturday', label: 'Сб' },
    { key: 'sunday', label: 'Вс' },
  ];

  return days
    .map(day => {
      const hours = entity.work_hours?.[day.key as keyof typeof entity.work_hours];
      if (!hours) return null;
      if (hours.closed) return `${day.label}: Выходной`;
      return `${day.label}: ${hours.open}-${hours.close}`;
    })
    .filter(Boolean)
    .join('\n');
}

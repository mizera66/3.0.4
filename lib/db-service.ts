// lib/db-service.ts
import initialData, { Database, Entity, Signal, Guide } from '@/data/db';

// Simple in-memory database for MVP
// Replace with PostgreSQL + Prisma for production
let db: Database = JSON.parse(JSON.stringify(initialData));

export const dbService = {
  // Entities
  getEntities: (filters?: {
    type?: string;
    area?: string;
    tags?: string[];
    search?: string;
    status?: string;
  }): Entity[] => {
    let entities = db.entities.filter(e => e.status !== 'archived');

    if (filters?.type) {
      entities = entities.filter(e => e.type === filters.type);
    }

    if (filters?.area) {
      entities = entities.filter(e => e.area === filters.area);
    }

    if (filters?.tags && filters.tags.length > 0) {
      entities = entities.filter(e => 
        filters.tags!.some(tag => e.tags.includes(tag))
      );
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      entities = entities.filter(e =>
        e.title.toLowerCase().includes(search) ||
        e.short_description.toLowerCase().includes(search) ||
        e.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    if (filters?.status) {
      entities = entities.filter(e => e.status === filters.status);
    }

    // Sort by rating (highest first)
    return entities.sort((a, b) => b.rating - a.rating);
  },

  getEntity: (id: string): Entity | undefined => {
    return db.entities.find(e => e.id === id);
  },

  createEntity: (entity: Omit<Entity, 'id' | 'created_at' | 'updated_at'>): Entity => {
    const newEntity: Entity = {
      ...entity,
      id: `entity-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.entities.push(newEntity);
    return newEntity;
  },

  updateEntity: (id: string, updates: Partial<Entity>): Entity | undefined => {
    const index = db.entities.findIndex(e => e.id === id);
    if (index === -1) return undefined;

    db.entities[index] = {
      ...db.entities[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return db.entities[index];
  },

  deleteEntity: (id: string): boolean => {
    const index = db.entities.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    db.entities[index].status = 'archived';
    db.entities[index].updated_at = new Date().toISOString();
    return true;
  },

  // Signals
  addSignal: (signal: Omit<Signal, 'id' | 'created_at'>): Signal => {
    const newSignal: Signal = {
      ...signal,
      id: `signal-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    db.signals.push(newSignal);

    // Update entity last confirmed
    const entity = db.entities.find(e => e.id === signal.entity_id);
    if (entity) {
      if (signal.type === 'confirm') {
        entity.last_confirmed_at = new Date().toISOString();
      }
      entity.updated_at = new Date().toISOString();
    }

    return newSignal;
  },

  getSignals: (entity_id?: string): Signal[] => {
    if (entity_id) {
      return db.signals.filter(s => s.entity_id === entity_id);
    }
    return db.signals;
  },

  // Guides
  getGuides: (category?: string): Guide[] => {
    if (category) {
      return db.guides.filter(g => g.category === category);
    }
    return db.guides;
  },

  getGuide: (id: string): Guide | undefined => {
    return db.guides.find(g => g.id === id);
  },

  // Areas (extract unique areas)
  getAreas: (): string[] => {
    const areas = new Set(db.entities.map(e => e.area));
    return Array.from(areas).sort();
  },

  // Tags (extract unique tags)
  getTags: (): string[] => {
    const tags = new Set(db.entities.flatMap(e => e.tags));
    return Array.from(tags).sort();
  },

  // Popular entities
  getPopular: (limit: number = 6): Entity[] => {
    return db.entities
      .filter(e => e.status === 'active')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  },

  // Reset database (for testing)
  reset: () => {
    db = JSON.parse(JSON.stringify(initialData));
  },
};

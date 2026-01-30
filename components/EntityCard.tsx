'use client';

import { Star } from 'lucide-react';
import { Entity } from '@/data/db';
import Link from 'next/link';
import LazyImage from './LazyImage';
import { getOpenStatus, getOpenStatusColor } from '@/lib/workHours';

interface EntityCardProps {
  entity: Entity;
}

export default function EntityCard({ entity }: EntityCardProps) {
  const openStatus = getOpenStatus(entity);
  const statusColor = getOpenStatusColor(entity);
  // Render stars for rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(entity.rating);
    const hasHalfStar = entity.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={16} className="text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} size={16} className="text-gray-300" />
        );
      }
    }

    return stars;
  };

  return (
    <Link
      href={`/entity/${entity.id}`}
      className="block bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all overflow-hidden"
    >
      {/* Image */}
      {entity.image_url && (
        <div className="relative h-48">
          <LazyImage
            src={entity.image_url}
            alt={entity.title}
            className="rounded-t-2xl"
            aspectRatio="2/1"
          />
          {/* Open/Closed status */}
          {openStatus && (
            <div className="absolute bottom-2 left-2">
              <span className={`text-xs font-medium px-2 py-1 rounded bg-white/90 backdrop-blur-sm ${statusColor}`}>
                {openStatus}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-2 line-clamp-2">
          {entity.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {renderStars()}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {entity.rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">
            ({entity.rating_count})
          </span>
        </div>

        {/* Area & Price */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{entity.area}</span>
          <span className="text-primary font-bold">
            {'$'.repeat(entity.price_level)}
          </span>
        </div>
      </div>
    </Link>
  );
}

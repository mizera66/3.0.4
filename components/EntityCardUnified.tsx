// components/EntityCardUnified.tsx - Unified Entity Card Component
//
// WHAT THIS DOES:
// Single smart component that can display entity cards in two variants:
// - "single" = 1 photo (used on homepage "Лучшее на этой неделе")
// - "gallery" = 3 photos (70% main + 30% split, used everywhere else)
//
// HOW IT WORKS:
// 1. Receives entity data + variant prop
// 2. If variant="single" → displays 1 main photo
// 3. If variant="gallery" → displays 3-photo layout (main + 2 side)
// 4. Automatically falls back to single photo if gallery not available
//
// AUTOMATIC DISPLAY RULES:
// - Has 3+ photos → show gallery layout
// - Has 1-2 photos → show single photo (no split)
// - All metadata (rating, open status, price) same for both variants

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Entity } from '@/data/db';
import { getOpenStatus, getOpenStatusColor } from '@/lib/workHours';

interface EntityCardUnifiedProps {
  entity: Entity;
  variant?: 'single' | 'gallery'; // Display variant
}

export default function EntityCardUnified({ 
  entity, 
  variant = 'gallery' // Default to gallery (3 photos)
}: EntityCardUnifiedProps) {
  const openStatus = getOpenStatus(entity);
  const statusColor = getOpenStatusColor(entity);

  // Check if entity has gallery photos (need at least 2 for split view)
  const hasGallery = entity.gallery && entity.gallery.length >= 2;
  
  // Force single variant if no gallery available
  const displayVariant = (variant === 'gallery' && hasGallery) ? 'gallery' : 'single';

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
          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400 opacity-50" />
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
      className="block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all card-interactive"
    >
      {/* IMAGE SECTION - Changes based on variant */}
      {displayVariant === 'gallery' ? (
        // GALLERY VARIANT: 3 photos (70% main + 30% split)
        <div className="flex gap-1 h-48">
          {/* Main image - 70% */}
          <div className="relative flex-[0.7]">
            <Image
              src={entity.image_url || '/placeholder.jpg'}
              alt={entity.title}
              fill
              className="object-cover"
            />
            {/* Open/Closed badge on main image */}
            {openStatus && (
              <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-white/80 ${statusColor}`}>
                {openStatus}
              </div>
            )}
          </div>
          
          {/* Side images - 30% split vertically */}
          <div className="flex-[0.3] flex flex-col gap-1">
            <div className="relative flex-1">
              <Image
                src={entity.gallery![0]}
                alt={`${entity.title} - фото 2`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-1">
              <Image
                src={entity.gallery![1]}
                alt={`${entity.title} - фото 3`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        // SINGLE VARIANT: 1 photo (full width)
        <div className="relative h-48">
          <Image
            src={entity.image_url || '/placeholder.jpg'}
            alt={entity.title}
            fill
            className="object-cover"
          />
          {/* Open/Closed badge */}
          {openStatus && (
            <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm bg-white/80 ${statusColor}`}>
              {openStatus}
            </div>
          )}
        </div>
      )}

      {/* METADATA SECTION - Compact spacing */}
      <div className="p-3">
        {/* Title - closer to image */}
        <h3 className="font-bold text-lg text-gray-900 mb-1.5 line-clamp-1">
          {entity.title}
        </h3>

        {/* Tags - closer */}
        <div className="flex flex-wrap gap-1 mb-1.5">
          {entity.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & Reviews - no parentheses, closer */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex gap-0.5">{renderStars()}</div>
          <span className="text-sm text-gray-600">
            {entity.rating.toFixed(1)} • {entity.rating_count}
          </span>
        </div>

      </div>
    </Link>
  );
}

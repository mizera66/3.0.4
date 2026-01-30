'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Entity } from '@/data/db';
import { getOpenStatus, getOpenStatusColor } from '@/lib/workHours';

interface EntityCardWithGalleryProps {
  entity: Entity;
}

export default function EntityCardWithGallery({ entity }: EntityCardWithGalleryProps) {
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
    <Link href={`/entity/${entity.id}`}>
      <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
        {/* Image Gallery - 70% main + 30% split (if gallery exists) */}
        <div className="relative h-48">
          {entity.gallery && entity.gallery.length >= 2 ? (
            <div className="flex gap-1 h-full">
              {/* Main image - 70% */}
              <div className="relative flex-[0.7]">
                <Image
                  src={entity.image_url || '/placeholder.png'}
                  alt={entity.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Open/Closed badge */}
                {openStatus && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                    <span className={`text-xs font-semibold ${statusColor}`}>
                      {openStatus}
                    </span>
                  </div>
                )}
              </div>

              {/* Side images - 30% split */}
              <div className="flex-[0.3] flex flex-col gap-1">
                <div className="relative flex-1">
                  <Image
                    src={entity.gallery[0]}
                    alt={`${entity.title} 2`}
                    fill
                    sizes="(max-width: 768px) 20vw, 10vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative flex-1">
                  <Image
                    src={entity.gallery[1]}
                    alt={`${entity.title} 3`}
                    fill
                    sizes="(max-width: 768px) 20vw, 10vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Fallback to single image if no gallery */
            <>
              <Image
                src={entity.image_url || '/placeholder.png'}
                alt={entity.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {openStatus && (
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                  <span className={`text-xs font-semibold ${statusColor}`}>
                    {openStatus}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-2 line-clamp-2">
            {entity.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {entity.short_description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars()}
              </div>
              <span className="text-sm text-gray-600">
                {entity.rating} ({entity.rating_count})
              </span>
            </div>
            
            <div className="text-primary font-bold">
              {'$'.repeat(entity.price_level)}
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            {entity.area}
          </div>
        </div>
      </div>
    </Link>
  );
}

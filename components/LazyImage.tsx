// components/LazyImage.tsx - Optimized Image Component with Lazy Loading
//
// WHAT THIS COMPONENT DOES:
// - Shows a blur placeholder while image is loading (better UX)
// - Lazy loads images (only loads when near viewport)
// - Handles loading errors with fallback
// - Adds fade-in animation when image loads
//
// WHY THIS IS IMPORTANT:
// - Saves bandwidth (doesn't load off-screen images)
// - Faster initial page load
// - Better experience on slow 3G connections
// - Reduces data usage for users
//
// HOW IT WORKS:
// 1. Shows gray blur placeholder immediately
// 2. Image starts loading when it enters viewport (loading="lazy")
// 3. When loaded, fades in smoothly
// 4. If error, shows fallback placeholder

'use client';

import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '',
  aspectRatio = '16/9',
}: LazyImageProps) {
  // STATE: Track if image has loaded successfully
  const [isLoaded, setIsLoaded] = useState(false);
  
  // STATE: Track if image failed to load
  const [hasError, setHasError] = useState(false);

  // FUNCTION: Handle successful image load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // FUNCTION: Handle image load error
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Stop showing loading state
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* BLUR PLACEHOLDER - shows while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}

      {/* ERROR FALLBACK - shows if image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg 
              className="mx-auto mb-2" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <p className="text-xs">Фото недоступно</p>
          </div>
        </div>
      ) : (
        /* ACTUAL IMAGE - lazy loaded with fade-in animation */
        <img
          src={src}
          alt={alt}
          loading="lazy" // Browser native lazy loading
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}

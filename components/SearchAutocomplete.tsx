'use client';
// Search Autocomplete Component - Real-time suggestions for entities, guides, and tags

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Suggestion {
  type: 'entity' | 'guide' | 'tag';
  title: string;
  subtitle?: string;
  href: string;
}

export default function SearchAutocomplete() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Update dropdown position when showing
  useEffect(() => {
    if (showSuggestions && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  }, [showSuggestions]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        // Fetch entities
        const entitiesRes = await fetch(`/api/entities?q=${encodeURIComponent(query)}&limit=5`);
        const entitiesData = await entitiesRes.json();

        // Fetch guides
        const guidesRes = await fetch('/api/guides');
        const guidesData = await guidesRes.json();

        const newSuggestions: Suggestion[] = [];

        // Add entity suggestions
        entitiesData.entities?.slice(0, 3).forEach((entity: any) => {
          newSuggestions.push({
            type: 'entity',
            title: entity.title,
            subtitle: entity.area,
            href: `/entity/${entity.id}`,
          });
        });

        // Add guide suggestions
        guidesData.guides
          ?.filter((guide: any) => 
            guide.title.toLowerCase().includes(query.toLowerCase()) ||
            guide.category.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 3)
          .forEach((guide: any) => {
            newSuggestions.push({
              type: 'guide',
              title: guide.title,
              subtitle: `Гайд • ${guide.category}`,
              href: `/guide/${guide.id}`,
            });
          });

        // Add tag suggestions
        const commonTags = ['Аренда байков', 'Визы', 'Spa', 'Кафе', 'Медицина', 'Экскурсии'];
        commonTags
          .filter(tag => tag.toLowerCase().includes(query.toLowerCase()))
          .forEach(tag => {
            newSuggestions.push({
              type: 'tag',
              title: tag,
              subtitle: 'Категория',
              href: `/search?q=${encodeURIComponent(tag)}`,
            });
          });

        setSuggestions(newSuggestions.slice(0, 6));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (href: string) => {
    router.push(href);
    setShowSuggestions(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex].href);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'entity': return '📍';
      case 'guide': return '📖';
      case 'tag': return '🏷️';
      default: return '🔍';
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative animate-slide-up animation-delay-100">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          placeholder="Что ты ищешь на Бали? 🌴"
          className="w-full px-6 py-4 pr-14 rounded-full shadow-card text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-all"
        >
          <Search size={20} />
        </button>
      </form>

      {/* Suggestions Dropdown - Rendered in portal to appear above everything */}
      {showSuggestions && suggestions.length > 0 && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[9997]"
            onClick={() => setShowSuggestions(false)}
          />
          
          {/* Dropdown - Fixed positioning with calculated position */}
          <div 
            className="fixed bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9998] overflow-hidden animate-slide-up max-h-96 overflow-y-auto"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${index}`}
                onClick={() => handleSuggestionClick(suggestion.href)}
                className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0 ${
                  index === selectedIndex ? 'bg-gray-50' : ''
                }`}
              >
                <span className="text-2xl flex-shrink-0">{getTypeIcon(suggestion.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">{suggestion.title}</div>
                  {suggestion.subtitle && (
                    <div className="text-sm text-gray-500 truncate">{suggestion.subtitle}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

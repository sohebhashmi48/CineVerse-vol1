import React, { useState, useRef, useEffect } from 'react';
import { X, Search, Star, Calendar, Clock } from 'lucide-react';
import { Movie } from '../types/movie';
import { movies } from '../data/movies';
import { useGSAP } from '../hooks/useGSAP';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      // Simplified open animation
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    } else {
      // Simplified close animation
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
        }
      });
    }
  }, [isOpen, gsap]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
      style={{ display: 'none' }}
    >
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Search Movies</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, genre, director, or cast..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all duration-200"
              autoFocus
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-6">
          {searchTerm.trim() === '' ? (
            <div className="text-center text-gray-400 py-8">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Start typing to search movies...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-lg">No movies found for "{searchTerm}"</p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((movie) => (
                <div key={movie.id} className="flex items-center space-x-4 p-4 hover:bg-white/5 rounded-lg transition-colors duration-200 cursor-pointer group">
                  {/* Movie Poster */}
                  <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg group-hover:text-yellow-400 transition-colors duration-200">
                      {movie.title}
                    </h3>
                    
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{movie.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{movie.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {movie.genre.map((g) => (
                        <span
                          key={g}
                          className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
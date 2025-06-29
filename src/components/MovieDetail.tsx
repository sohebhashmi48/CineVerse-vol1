import React, { useRef, useEffect } from 'react';
import { X, Play, Plus, Star, Calendar, Clock, User, Users } from 'lucide-react';
import { Movie } from '../types/movie';
import { useGSAP } from '../hooks/useGSAP';

interface MovieDetailProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current) return;

    if (isOpen && movie) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Simplified open animation
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    } else {
      // Simplified close animation
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
          document.body.style.overflow = 'auto';
        }
      });
    }
  }, [isOpen, movie, gsap]);

  if (!movie) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ display: 'none' }}
    >
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-200"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900/50"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-end p-8">
            <div className="flex items-end space-x-6 w-full">
              {/* Movie Poster */}
              <div className="flex-shrink-0 w-48 h-72 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 pb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {movie.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold text-white">{movie.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{movie.duration}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="group flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-200 hover:scale-105">
                    <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>Play Now</span>
                  </button>
                  
                  <button className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-full text-white font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105">
                    <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>My List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8 max-h-96 overflow-y-auto">
          {/* Description */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Cast and Crew */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Director</span>
              </h3>
              <p className="text-gray-300 text-lg">{movie.director}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Cast</span>
              </h3>
              <div className="space-y-2">
                {movie.cast.map((actor, index) => (
                  <p key={index} className="text-gray-300">{actor}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div>
              <h4 className="text-white font-semibold mb-2">Release Year</h4>
              <p className="text-gray-400">{movie.year}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Duration</h4>
              <p className="text-gray-400">{movie.duration}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Rating</h4>
              <p className="text-gray-400 flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{movie.rating}/10</span>
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Genres</h4>
              <p className="text-gray-400">{movie.genre.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
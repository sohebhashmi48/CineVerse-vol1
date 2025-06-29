import React, { useRef, useEffect } from 'react';
import { Star, Play, Plus, Clock } from 'lucide-react';
import { Movie } from '../types/movie';
import { use3DCardEffect, useGSAP } from '../hooks/useGSAP';

interface MovieCardProps {
  movie: Movie;
  index: number;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  use3DCardEffect(cardRef);

  useEffect(() => {
    if (!cardRef.current) return;

    // Simplified entrance animation
    gsap.fromTo(cardRef.current, 
      { 
        opacity: 0, 
        y: 50, 
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.5,
        delay: index * 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Optimized hover effects
    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.2,
        ease: "power1.out"
      });
      
      gsap.to(card.querySelector('.movie-overlay'), {
        opacity: 1,
        duration: 0.2
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.2,
        ease: "power1.out"
      });
      
      gsap.to(card.querySelector('.movie-overlay'), {
        opacity: 0,
        duration: 0.2
      });
    };
    
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gsap, ScrollTrigger, index]);

  const handleCardClick = () => {
    onClick(movie);
  };

  return (
    <div 
      ref={cardRef}
      className="group relative cursor-pointer transform-gpu will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={handleCardClick}
    >
      {/* Card Container */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl">
        {/* Movie Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-semibold text-white">{movie.rating}</span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-xs font-semibold text-white">{movie.year}</span>
        </div>

        {/* Overlay on Hover */}
        <div className="movie-overlay absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 transition-opacity duration-200">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Title */}
            <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
              {movie.title}
            </h3>
            
            {/* Meta Info */}
            <div className="flex items-center space-x-4 mb-3 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{movie.duration}</span>
              </div>
              <span>•</span>
              <span>{movie.genre[0]}</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm line-clamp-3 mb-4">
              {movie.description}
            </p>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-200 rounded-full transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Play className="w-4 h-4 text-black fill-current ml-0.5" />
              </button>
              
              <button 
                className="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full border border-white/30 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-200"></div>
      </div>
    </div>
  );
};

export default MovieCard;
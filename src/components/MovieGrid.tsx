import React, { useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import { useGSAP } from '../hooks/useGSAP';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  variant?: 'default' | 'featured';
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ title, movies, variant = 'default', onMovieClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Simplified title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, [gsap, ScrollTrigger]);

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 
            ref={titleRef}
            className={`font-bold text-white ${
              variant === 'featured' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
            }`}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          
          <button className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200">
            <span className="text-sm font-medium">View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Movie Grid */}
        <div 
          ref={gridRef}
          className={`grid gap-6 ${
            variant === 'featured' 
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
              : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6'
          }`}
        >
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index}
              onClick={onMovieClick}
            />
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
    </section>
  );
};

export default MovieGrid;
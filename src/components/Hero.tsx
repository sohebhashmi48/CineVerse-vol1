import React, { useRef, useEffect } from 'react';
import { Play, Info, Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';
import { useGSAP, useParallax } from '../hooks/useGSAP';

interface HeroProps {
  movie: Movie;
}

const Hero: React.FC<HeroProps> = ({ movie }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger } = useGSAP();

  useParallax(bgRef, 0.3);

  useEffect(() => {
    if (!contentRef.current) return;

    // Simplified hero content animation
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo('.hero-meta', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }, "-=0.4"
    )
    .fromTo('.hero-description', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }, "-=0.3"
    )
    .fromTo('.hero-buttons', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.3"
    );

    // Simplified content fade on scroll
    gsap.to(contentRef.current, {
      opacity: 0.3,
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "50% top",
        scrub: 1
      }
    });

  }, [gsap, ScrollTrigger]);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-[110%]"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Simplified gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
      </div>

      {/* Reduced floating particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Movie Title */}
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                {movie.title}
              </span>
            </h1>

            {/* Movie Meta Information */}
            <div className="hero-meta flex flex-wrap items-center gap-6 mb-6 text-gray-300">
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
              <div className="flex gap-2">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="hero-description text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl">
              {movie.description}
            </p>

            {/* Action Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-200 hover:scale-105">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Play Now</span>
              </button>
              
              <button className="group flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-full text-white font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105">
                <Info className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>More Info</span>
              </button>
            </div>

            {/* Director and Cast */}
            <div className="hero-meta mt-8 space-y-2 text-gray-400">
              <p>
                <span className="text-white font-medium">Director:</span> {movie.director}
              </p>
              <p>
                <span className="text-white font-medium">Cast:</span> {movie.cast.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
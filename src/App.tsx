import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import SearchModal from './components/SearchModal';
import MovieDetail from './components/MovieDetail';
import { featuredMovie, genreCategories } from './data/movies';
import { Movie } from './types/movie';
import { useGSAP } from './hooks/useGSAP';

function App() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieDetailOpen, setIsMovieDetailOpen] = useState(false);
  const { gsap } = useGSAP();

  useEffect(() => {
    // Simple page load animation
    gsap.to('body', { opacity: 1, duration: 0.3 });
    
    // Simplified cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-3 h-3 bg-yellow-400/20 rounded-full pointer-events-none z-50 mix-blend-screen';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - 6;
      mouseY = e.clientY - 6;
    };
    
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(updateCursor);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    updateCursor();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, [gsap]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieDetailOpen(true);
  };

  const handleCloseMovieDetail = () => {
    setIsMovieDetailOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <Header onSearchClick={() => setIsSearchModalOpen(true)} />

      {/* Hero Section */}
      <Hero movie={featuredMovie} />

      {/* Movie Sections */}
      <div className="relative z-10 bg-gradient-to-b from-black via-gray-900 to-black">
        {genreCategories.map((category, index) => (
          <MovieGrid
            key={category.id}
            title={category.name}
            movies={category.movies}
            variant={index === 0 ? 'featured' : 'default'}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                CineVerse
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover infinite worlds of entertainment
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Help Center</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Movie Detail Modal */}
      <MovieDetail
        movie={selectedMovie}
        isOpen={isMovieDetailOpen}
        onClose={handleCloseMovieDetail}
      />
    </div>
  );
}

export default App;
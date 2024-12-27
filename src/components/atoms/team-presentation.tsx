'use client';

import { useState, useEffect } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO & Founder",
    image: "/team/one.jpeg",
    description: "Plus de 10 ans d'expérience dans le développement web."
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO",
    image: "/team/two.jpeg",
    description: "Experte en architecture logicielle et en gestion d'équipe."
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Lead Developer",
    image: "/team/three.jpeg",
    description: "Spécialiste en développement frontend et UX design."
  }
];

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="relative w-full mx-auto px- py-16 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Notre Équipe
      </h2>

      <div className="relative h-[500px] overflow-hidden">
        <div
          className={`absolute w-full h-full transition-opacity duration-500 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg">
              <img
                src={teamMembers[currentIndex].image}
                alt={teamMembers[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {teamMembers[currentIndex].name}
            </h3>
            <p className="text-xl text-blue-600 mb-4">
              {teamMembers[currentIndex].role}
            </p>
            <p className="text-gray-600 text-center max-w-2xl px-4">
              {teamMembers[currentIndex].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center gap-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 px-4 py-2 bg-white rounded-full shadow-lg text-sm hover:bg-gray-100 transition-colors"
      >
        {isAutoPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default TeamCarousel;
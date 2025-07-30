import { useState, useEffect } from "react";

// Define the image data
const travelImages = [
  {
    id: 1,
    src: "/images/travel1.jpg",
    alt: "Scenic mountain landscape",
    caption: "Explore breathtaking mountains",
    location: "Himalayas, India"
  },
  {
    id: 2,
    src: "/images/travel2.jpg",
    alt: "Beautiful beach sunset",
    caption: "Relax on pristine beaches",
    location: "Goa, India"
  },
  {
    id: 3,
    src: "/images/travel3.jpg",
    alt: "Historic temple architecture",
    caption: "Discover ancient temples",
    location: "Varanasi, India"
  },
  {
    id: 4,
    src: "/images/travel4.jpg",
    alt: "Bustling city market",
    caption: "Experience vibrant city life",
    location: "Delhi, India"
  },
  {
    id: 5,
    src: "/images/travel5.jpg",
    alt: "Serene backwaters",
    caption: "Cruise through peaceful backwaters",
    location: "Kerala, India"
  }
];

// Reliable images for the carousel
const fallbackImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Taj Mahal",
    caption: "Explore iconic monuments",
    location: "Agra, India"
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Beautiful beach sunset",
    caption: "Relax on pristine beaches",
    location: "Goa, India"
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/5458388/pexels-photo-5458388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Historic temple architecture",
    caption: "Discover ancient temples",
    location: "Varanasi, India"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Bustling city market",
    caption: "Experience vibrant city life",
    location: "Delhi, India"
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1310788/pexels-photo-1310788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Serene backwaters",
    caption: "Cruise through peaceful backwaters",
    location: "Kerala, India"
  }
];

export function TravelPhotoGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Always use the fallback images since we know the local images don't exist
  const [images] = useState(fallbackImages);
  const [imagesLoaded, setImagesLoaded] = useState(true);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!imagesLoaded) {
    return <div className="h-96 bg-gray-800 animate-pulse rounded-lg"></div>;
  }

  return (
    <div className="relative overflow-hidden shadow-xl h-[600px] w-full max-w-none -mt-1">
      {/* Main image */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/90"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-4xl">
              <h3 className="text-3xl md:text-5xl font-bold mb-2">{image.caption}</h3>
              <p className="text-xl text-gray-300">{image.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="absolute left-6 md:left-12 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextImage}
        className="absolute right-6 md:right-12 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors shadow-md ${
              index === currentImageIndex ? "bg-blue-500" : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to image ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

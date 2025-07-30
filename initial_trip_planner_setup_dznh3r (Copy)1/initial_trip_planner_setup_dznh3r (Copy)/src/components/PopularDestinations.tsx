import React from 'react';

// Define the destination data
const destinations = [
  {
    id: 1,
    name: "Taj Mahal, Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "One of the seven wonders of the world, a symbol of eternal love."
  },
  {
    id: 2,
    name: "Varanasi Ghats",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Experience spiritual awakening at the oldest living city in the world."
  },
  {
    id: 3,
    name: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "The Pink City with magnificent palaces and vibrant culture."
  },
  {
    id: 4,
    name: "Goa Beaches",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Relax on pristine beaches with golden sands and clear waters."
  }
];

export function PopularDestinations() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Popular Destinations in India</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <div 
            key={destination.id} 
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-1">{destination.name}</h3>
              <p className="text-gray-400 text-sm">{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

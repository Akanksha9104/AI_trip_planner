import React from 'react';

// Define the travel card data
const travelCards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    title: "Historical Sites",
    description: "Explore ancient wonders"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1602301413791-a1c9be900343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    title: "Scenic Beauty",
    description: "Breathtaking landscapes"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    title: "Local Culture",
    description: "Authentic experiences"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    title: "Beach Getaways",
    description: "Relax by the shore"
  }
];

export function TravelImageCards() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {travelCards.map((card) => (
        <div 
          key={card.id} 
          className="relative overflow-hidden rounded-lg shadow-md group"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-white font-medium text-sm">{card.title}</h3>
            <p className="text-gray-300 text-xs">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

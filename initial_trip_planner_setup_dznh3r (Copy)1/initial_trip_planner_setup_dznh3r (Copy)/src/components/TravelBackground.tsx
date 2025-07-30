import React from 'react';

export function TravelBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0">
      {/* Solid background color */}
      <div className="absolute inset-0 w-full h-full bg-gray-900"></div>

      {/* Travel question text pattern */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-[15%] left-[10%]">
          <p className="text-white text-6xl font-bold opacity-10">Where?</p>
        </div>
        <div className="absolute top-[35%] right-[15%]">
          <p className="text-white text-7xl font-bold opacity-10">When?</p>
        </div>
        <div className="absolute bottom-[25%] left-[25%]">
          <p className="text-white text-6xl font-bold opacity-10">How?</p>
        </div>
        <div className="absolute top-[60%] right-[30%]">
          <p className="text-white text-5xl font-bold opacity-10">Budget?</p>
        </div>
        <div className="absolute top-[10%] right-[40%]">
          <p className="text-white text-5xl font-bold opacity-10">Money?</p>
        </div>
        <div className="absolute bottom-[40%] left-[5%]">
          <p className="text-white text-7xl font-bold opacity-10">Travel?</p>
        </div>
        <div className="absolute bottom-[10%] right-[10%]">
          <p className="text-white text-6xl font-bold opacity-10">Stay?</p>
        </div>
        <div className="absolute top-[45%] left-[40%]">
          <p className="text-white text-8xl font-bold opacity-10">Plan?</p>
        </div>
        <div className="absolute top-[75%] right-[45%]">
          <p className="text-white text-5xl font-bold opacity-10">Package?</p>
        </div>
        <div className="absolute top-[25%] left-[60%]">
          <p className="text-white text-6xl font-bold opacity-10">Adventure?</p>
        </div>
        <div className="absolute bottom-[60%] right-[60%]">
          <p className="text-white text-5xl font-bold opacity-10">Explore?</p>
        </div>
        <div className="absolute bottom-[30%] right-[25%]">
          <p className="text-white text-4xl font-bold opacity-10">Discover?</p>
        </div>
        <div className="absolute top-[5%] left-[30%]">
          <p className="text-white text-5xl font-bold opacity-10">Destination?</p>
        </div>
        <div className="absolute top-[85%] left-[15%]">
          <p className="text-white text-6xl font-bold opacity-10">Journey?</p>
        </div>
        <div className="absolute top-[55%] right-[5%]">
          <p className="text-white text-4xl font-bold opacity-10">Experience?</p>
        </div>
        <div className="absolute bottom-[50%] left-[55%]">
          <p className="text-white text-7xl font-bold opacity-10">Wander?</p>
        </div>
        <div className="absolute bottom-[15%] left-[45%]">
          <p className="text-white text-5xl font-bold opacity-10">Itinerary?</p>
        </div>
        <div className="absolute top-[20%] right-[20%]">
          <p className="text-white text-6xl font-bold opacity-10">Vacation?</p>
        </div>
        <div className="absolute bottom-[75%] right-[35%]">
          <p className="text-white text-4xl font-bold opacity-10">Transport?</p>
        </div>
        <div className="absolute top-[30%] left-[20%]">
          <p className="text-white text-5xl font-bold opacity-10">Flight?</p>
        </div>
        <div className="absolute bottom-[20%] right-[50%]">
          <p className="text-white text-6xl font-bold opacity-10">Hotel?</p>
        </div>
        <div className="absolute top-[70%] left-[35%]">
          <p className="text-white text-4xl font-bold opacity-10">Sightseeing?</p>
        </div>
        <div className="absolute bottom-[65%] left-[15%]">
          <p className="text-white text-5xl font-bold opacity-10">Relax?</p>
        </div>
        <div className="absolute top-[40%] right-[25%]">
          <p className="text-white text-6xl font-bold opacity-10">Explore?</p>
        </div>
        <div className="absolute bottom-[35%] right-[15%]">
          <p className="text-white text-4xl font-bold opacity-10">Culture?</p>
        </div>
        <div className="absolute top-[15%] left-[45%]">
          <p className="text-white text-5xl font-bold opacity-10">Food?</p>
        </div>
        <div className="absolute bottom-[55%] right-[40%]">
          <p className="text-white text-6xl font-bold opacity-10">Adventure?</p>
        </div>
        <div className="absolute top-[65%] left-[5%]">
          <p className="text-white text-4xl font-bold opacity-10">Memories?</p>
        </div>
        <div className="absolute bottom-[5%] left-[65%]">
          <p className="text-white text-5xl font-bold opacity-10">Passport?</p>
        </div>
        <div className="absolute top-[50%] right-[55%]">
          <p className="text-white text-7xl font-bold opacity-10">Discover?</p>
        </div>
        <div className="absolute bottom-[45%] right-[5%]">
          <p className="text-white text-4xl font-bold opacity-10">Landmarks?</p>
        </div>
        <div className="absolute top-[80%] right-[25%]">
          <p className="text-white text-5xl font-bold opacity-10">Souvenirs?</p>
        </div>
        <div className="absolute bottom-[80%] left-[50%]">
          <p className="text-white text-6xl font-bold opacity-10">Backpack?</p>
        </div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-purple-900/20 bg-[length:300%_300%] animate-gradient-slow"></div>
    </div>
  );
}

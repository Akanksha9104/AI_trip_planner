"use client";
import { useState } from "react";
import { toast } from "./hooks/use-toast";
// Import will be added after component is created

interface SignInFormProps {
  onSignIn: () => void;
}

export function SignInForm({ onSignIn }: SignInFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = () => {
    setSubmitting(true);

    // Simulate a brief loading state
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Welcome!",
        description: "Signed in successfully!",
        variant: "default"
      });
      onSignIn(); // Call the callback to update parent component
    }, 800);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Welcome to Make It Happen</h2>
        <p className="text-gray-400">Your AI-powered travel companion</p>
      </div>

      {/* Travel Image Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Card 1 - Taj Mahal */}
        <div className="relative overflow-hidden rounded-lg shadow-md group">
          <div className="aspect-[4/3] overflow-hidden bg-gray-700">
            <img
              src="https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Historical Sites"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-white font-medium text-sm">Historical Sites</h3>
            <p className="text-gray-300 text-xs">Explore ancient wonders</p>
          </div>
        </div>

        {/* Card 2 - Himalayas */}
        <div className="relative overflow-hidden rounded-lg shadow-md group">
          <div className="aspect-[4/3] overflow-hidden bg-gray-700">
            <img
              src="https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=600"
              alt="Scenic Beauty"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-white font-medium text-sm">Scenic Beauty</h3>
            <p className="text-gray-300 text-xs">Breathtaking landscapes</p>
          </div>
        </div>

        {/* Card 3 - Indian Market */}
        <div className="relative overflow-hidden rounded-lg shadow-md group">
          <div className="aspect-[4/3] overflow-hidden bg-gray-700">
            <img
              src="https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Local Culture"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-white font-medium text-sm">Local Culture</h3>
            <p className="text-gray-300 text-xs">Authentic experiences</p>
          </div>
        </div>

        {/* Card 4 - Goa Beach */}
        <div className="relative overflow-hidden rounded-lg shadow-md group">
          <div className="aspect-[4/3] overflow-hidden bg-gray-700">
            <img
              src="https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Beach Getaways"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-3">
            <h3 className="text-white font-medium text-sm">Beach Getaways</h3>
            <p className="text-gray-300 text-xs">Relax by the shore</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <button
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
          onClick={handleSignIn}
          disabled={submitting}
        >
          {submitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              <span>Continue to Trip Planner</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6 space-y-1">
        <p>This app uses AI to generate personalized trip itineraries</p>
        <p>and packing lists based on your preferences.</p>
      </div>
    </div>
  );
}

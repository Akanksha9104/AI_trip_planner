import { useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { TripPlanner } from "./components/TripPlanner";
import { SignInForm } from "./SignInForm";
import { TravelPhotoGallery } from "./components/TravelPhotoGallery";
import { PopularDestinations } from "./components/PopularDestinations";
import { TravelTips } from "./components/TravelTips";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="sticky top-0 z-10 bg-gray-800/90 backdrop-blur-sm px-6 py-4 flex justify-between items-center border-b border-gray-700 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-white">Make It <span className="text-blue-400">Happen</span></h2>
          </div>

          <div className="hidden md:block h-6 w-px bg-gray-700 mx-2"></div>

          <h1 className="hidden md:block text-xl font-bold text-white">Plan Your Next <span className="text-blue-400">Adventure</span></h1>
        </div>

        {!isSignedIn && (
          <button
            onClick={() => setIsSignedIn(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-lg flex items-center space-x-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Sign In</span>
          </button>
        )}
      </header>
      <main className="flex-1">
        <Content isSignedIn={isSignedIn} onSignIn={() => setIsSignedIn(true)} />
      </main>
      <footer className="py-6 border-t border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Make It Happen
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

interface ContentProps {
  isSignedIn: boolean;
  onSignIn: () => void;
}

function Content({ isSignedIn, onSignIn }: ContentProps) {

  return (
    <div className="flex flex-col">
      {/* Travel Photo Gallery - Full Width */}
      {!isSignedIn && <TravelPhotoGallery />}

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 max-w-7xl mx-auto w-full mt-8">

        {isSignedIn ? (
          <TripPlanner />
        ) : (
          <>
            <div className="max-w-5xl mx-auto card p-8 mb-12 shadow-xl">
              <p className="text-xl text-gray-300 mb-6">Sign in to start planning your trip</p>
              <SignInForm onSignIn={onSignIn} />
            </div>

            {/* Popular Destinations */}
            <PopularDestinations />

            {/* Travel Tips */}
            <TravelTips />
          </>
        )}
      </div>
    </div>
  );
}

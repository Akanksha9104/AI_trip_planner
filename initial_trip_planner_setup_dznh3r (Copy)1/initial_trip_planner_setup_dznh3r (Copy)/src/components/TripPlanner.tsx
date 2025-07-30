import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "../hooks/use-toast";
import { Id } from "../../convex/_generated/dataModel";
import { TripDetails } from "./TripDetails";
import { countries, Country, City } from "../data/countries";
import { TravelBackground } from "./TravelBackground";

export function TripPlanner() {
  const { toast } = useToast();
  const createTrip = useMutation(api.trips.createTrip);
  const deleteTrip = useMutation(api.trips.deleteTrip);
  const trips = useQuery(api.trips.listTrips) || [];
  const [selectedTripId, setSelectedTripId] = useState<Id<"trips"> | null>(null);
  const selectedTrip = useQuery(api.trips.getTrip, selectedTripId ? { tripId: selectedTripId } : "skip");
  const [tripToDelete, setTripToDelete] = useState<Id<"trips"> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    country: "",
    city: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    interests: [] as string[]
  });

  const [availableCities, setAvailableCities] = useState<City[]>([]);

  // Update available cities when country changes
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(c => c.id === formData.country);
      if (selectedCountry) {
        setAvailableCities(selectedCountry.cities);
        // Reset city selection when country changes
        if (formData.city && !selectedCountry.cities.some(city => city.id === formData.city)) {
          setFormData(prev => ({ ...prev, city: "" }));
        }
      }
    } else {
      setAvailableCities([]);
      setFormData(prev => ({ ...prev, city: "" }));
    }
  }, [formData.country]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      // Get the full names of country and city for the destination
      const selectedCountry = countries.find(c => c.id === formData.country);
      const selectedCity = availableCities.find(c => c.id === formData.city);

      console.log("Selected country:", selectedCountry);
      console.log("Selected city:", selectedCity);

      // Create the destination string
      const destinationString = selectedCity && selectedCountry
        ? `${selectedCity.name}, ${selectedCountry.name}`
        : formData.destination;

      console.log("Destination string:", destinationString);

      // Make sure we have a valid destination
      if (!destinationString && (!selectedCountry || !selectedCity)) {
        toast({
          title: "Missing Destination",
          description: "Please select a country and city or enter a custom destination.",
          variant: "destructive"
        });
        return;
      }

      // Make sure we have valid dates
      if (!formData.startDate || !formData.endDate) {
        toast({
          title: "Missing Dates",
          description: "Please select both start and end dates for your trip.",
          variant: "destructive"
        });
        return;
      }

      // Make sure we have a valid budget
      if (!formData.budget || isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
        toast({
          title: "Invalid Budget",
          description: "Please enter a valid budget amount.",
          variant: "destructive"
        });
        return;
      }

      // Make sure we have at least one interest
      if (!formData.interests.length) {
        toast({
          title: "Missing Interests",
          description: "Please enter at least one interest for your trip.",
          variant: "destructive"
        });
        return;
      }

      console.log("Calling createTrip with:", {
        ...formData,
        destination: destinationString,
        budget: Number(formData.budget),
      });

      await createTrip({
        ...formData,
        destination: destinationString,
        budget: Number(formData.budget),
      });

      console.log("Trip created successfully");

      toast({
        title: "Trip Created",
        description: "Your trip has been created and we're generating your itinerary!"
      });

      setFormData({
        country: "",
        city: "",
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
        interests: []
      });
    } catch (error) {
      console.error("Error creating trip:", error);
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <TravelBackground />

      <div className="relative z-10 max-w-6xl mx-auto w-full py-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
      <div className="card p-8 md:p-10 backdrop-blur-sm bg-gray-800/80 border border-gray-700 shadow-xl hover:shadow-blue-900/20 transition-all duration-300 h-full">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Create New Trip
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="input-field"
                required
              >
                <option value="">Select a country</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="input-field"
                disabled={!formData.country}
                required
              >
                <option value="">Select a city</option>
                {availableCities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Custom Destination (Optional)</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
              className="input-field"
              placeholder="Or enter a specific location"
            />
            <p className="text-xs text-gray-400 mt-1">Leave empty to use the selected country and city</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Budget (USD)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="input-field"
              placeholder="How much do you want to spend?"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Interests (comma-separated)</label>
            <input
              type="text"
              value={formData.interests.join(", ")}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                interests: e.target.value.split(",").map(i => i.trim()).filter(Boolean)
              }))}
              className="input-field"
              placeholder="e.g., hiking, food, museums, shopping"
              required
            />
          </div>
          <button
            type="submit"
            className="button w-full flex items-center justify-center space-x-2 mt-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            onClick={(e) => {
              console.log("Plan Trip button clicked");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 1.586l-4 4V16a1 1 0 001 1h6a1 1 0 001-1V5.586l-4-4zM11 0a1 1 0 00-.707.293l-5 5A1 1 0 005 6v10a3 3 0 003 3h6a3 3 0 003-3V6a1 1 0 00-.293-.707l-5-5A1 1 0 0011 0z" clipRule="evenodd" />
            </svg>
            <span>Plan Trip</span>
          </button>
        </form>
      </div>

      <div className="card p-8 md:p-10 backdrop-blur-sm bg-gray-800/80 border border-gray-700 shadow-xl hover:shadow-blue-900/20 transition-all duration-300 h-full">
        {selectedTrip ? (
          <TripDetails
            tripId={selectedTripId!}
            onBack={() => setSelectedTripId(null)}
            onDelete={() => {
              setSelectedTripId(null);
              // Refresh the trips list
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }}
          />

        ) : (
          <>
            <h2 className="section-title flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.96-.68l1.65-3.97A1 1 0 0014.64 4H3z" />
              </svg>
              Your Trips
            </h2>
            {trips.length === 0 ? (
              <div className="text-center py-10 bg-gray-700/70 backdrop-blur-sm rounded-lg border border-gray-600 mt-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-400">No trips planned yet. Create one to get started!</p>
              </div>
            ) : (
              <div className="space-y-4 mt-6">
                {trips.map((trip) => (
                  <div
                    key={trip._id}
                    className="trip-card relative backdrop-blur-sm bg-gray-800/90 border border-gray-700 shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => setSelectedTripId(trip._id)}
                    >
                      <h3 className="font-semibold text-white pr-8">{trip.destination}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </p>
                      {trip.itinerary ? (
                        <div className="mt-3 flex justify-between items-center">
                          <p className="text-sm text-green-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Itinerary ready
                          </p>
                          <span className="text-sm text-blue-400 flex items-center">
                            View details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      ) : (
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating itinerary...
                        </div>
                      )}
                    </div>
                    <button
                      className="absolute top-3 right-3 text-gray-500 hover:text-red-400 delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTripToDelete(trip._id);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && tripToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Delete Trip</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this trip? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setTripToDelete(null);
                }}
                className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteTrip({ tripId: tripToDelete });
                    toast({
                      title: "Trip Deleted",
                      description: "Your trip has been successfully deleted."
                    });
                    setShowDeleteConfirm(false);
                    setTripToDelete(null);
                    // Refresh the page to update the trips list
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to delete trip. Please try again.",
                      variant: "destructive"
                    });
                    setShowDeleteConfirm(false);
                    setTripToDelete(null);
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
              >
                Delete Trip
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

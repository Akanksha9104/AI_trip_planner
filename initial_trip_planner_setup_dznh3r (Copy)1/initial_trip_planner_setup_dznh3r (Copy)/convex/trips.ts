import { v } from "convex/values";
import { mutation, query, action, internalAction, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import OpenAI from "openai";

// Define the Trip type
type Trip = {
  country?: string;
  city?: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  userId?: any;
  _id?: any;
  itinerary?: any;
  packingList?: any;
};

// Initialize OpenAI with a mock API key
// We're using mock implementations instead of actual API calls
const openai = new OpenAI({
  baseURL: "https://api.openai.com/v1",
  apiKey: "mock-key-for-development-only", // Using a mock key to ensure we never make real API calls
});

export const createTrip = mutation({
  args: {
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    destination: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    budget: v.number(),
    interests: v.array(v.string())
  },
  handler: async (ctx, args) => {
    // Create a mock user ID for development
    const mockUserId = await ctx.db.insert("users", { name: "Guest User" });

    const tripId = await ctx.db.insert("trips", {
      userId: mockUserId,
      ...args
    });

    await ctx.scheduler.runAfter(0, internal.trips.generateItinerary, { tripId });
    await ctx.scheduler.runAfter(0, internal.trips.generatePackingList, { tripId });

    return tripId;
  }
});

export const listTrips = query({
  handler: async (ctx) => {
    // Get all trips without filtering by user ID
    return await ctx.db
      .query("trips")
      .collect();
  }
});

// Public query to get a single trip by ID
export const getTrip = query({
  args: { tripId: v.id("trips") },
  handler: async (ctx, args) => {
    const trip = await ctx.db.get(args.tripId);
    if (!trip) return null;
    return trip;
  }
});

export const generateItinerary = internalAction({
  args: { tripId: v.id("trips") },
  handler: async (ctx, args) => {
    const trip = await ctx.runQuery(internal.trips.getTripInternal, { tripId: args.tripId });
    if (!trip) throw new Error("Trip not found");

    try {
      console.log(`Generating itinerary for trip to ${trip.destination}`);

      // Calculate trip duration in days
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      const tripDuration = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

      // Always use mock data instead of making actual API calls
      console.log("Using mock implementation for itinerary generation");
      const itinerary = createMockItinerary(trip);
      await ctx.runMutation(internal.trips.updateItinerary, {
        tripId: args.tripId,
        itinerary
      });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      // Create a fallback itinerary if there's an error
      const fallbackItinerary = createFallbackItinerary(trip);
      await ctx.runMutation(internal.trips.updateItinerary, {
        tripId: args.tripId,
        itinerary: fallbackItinerary
      });
    }
  }
});

// Function to create a more detailed mock itinerary
function createMockItinerary(trip: Trip) {
  const days = Math.max(1, new Date(trip.endDate).getDate() - new Date(trip.startDate).getDate());
  const mockItinerary = [];

  // Sample activities based on interests
  const activities = {
    "food": ["Visit local food market", "Food tour", "Cooking class", "Dine at top-rated restaurant"],
    "history": ["Visit historical museum", "Guided historical tour", "Visit ancient ruins", "Historical walking tour"],
    "nature": ["Hiking in nearby trails", "Visit national park", "Nature photography tour", "Bird watching"],
    "adventure": ["Zip-lining", "Rock climbing", "White water rafting", "Paragliding"],
    "relaxation": ["Spa day", "Beach relaxation", "Yoga class", "Meditation retreat"],
    "shopping": ["Visit local markets", "Shopping at boutiques", "Souvenir hunting", "Mall visit"],
    "culture": ["Visit art galleries", "Cultural performance", "Local festival", "Cultural workshop"]
  };

  // Sample meals
  const meals = [
    "Breakfast at hotel buffet",
    "Brunch at local café",
    "Lunch at traditional restaurant",
    "Dinner at upscale restaurant",
    "Street food sampling",
    "Picnic lunch",
    "Seafood dinner",
    "Farm-to-table experience"
  ];

  // Sample accommodations
  const accommodations = [
    `${trip.budget > 300 ? 'Luxury' : 'Standard'} hotel in ${trip.destination}`,
    `Boutique hotel in ${trip.destination}`,
    `Resort in ${trip.destination}`,
    `Vacation rental in ${trip.destination}`
  ];

  // Create itinerary for each day
  for (let i = 1; i <= days; i++) {
    const dayActivities = [];

    // Add 2-4 activities per day based on interests
    const numActivities = 2 + Math.floor(Math.random() * 3);
    for (let j = 0; j < numActivities; j++) {
      // Try to match activities to interests
      let activity = "Explore the city";
      if (trip.interests.length > 0) {
        const interest = trip.interests[Math.floor(Math.random() * trip.interests.length)];
        const interestKey = Object.keys(activities).find(key => interest.toLowerCase().includes(key)) ||
                           Object.keys(activities)[Math.floor(Math.random() * Object.keys(activities).length)];

        const options = activities[interestKey as keyof typeof activities] || activities.culture;
        activity = options[Math.floor(Math.random() * options.length)];
      }
      dayActivities.push(activity);
    }

    // Add "Visit [destination]" for the first day
    if (i === 1) {
      dayActivities.unshift(`Arrive in ${trip.destination} and check in`);
    }

    // Add "Departure" for the last day
    if (i === days) {
      dayActivities.push(`Check out and depart from ${trip.destination}`);
    }

    // Create day entry
    mockItinerary.push({
      day: i,
      activities: dayActivities,
      meals: [
        meals[Math.floor(Math.random() * meals.length)],
        meals[Math.floor(Math.random() * meals.length)],
        meals[Math.floor(Math.random() * meals.length)]
      ],
      accommodations: accommodations[Math.floor(Math.random() * accommodations.length)],
      city: trip.city || trip.destination
    });
  }

  return mockItinerary;
}

// Helper function to create a fallback itinerary
function createFallbackItinerary(trip: Trip) {
  const days = Math.max(1, new Date(trip.endDate).getDate() - new Date(trip.startDate).getDate());
  const fallbackItinerary = [];

  for (let i = 1; i <= days; i++) {
    fallbackItinerary.push({
      day: i,
      activities: ["Explore " + trip.destination, "Visit local attractions"],
      meals: ["Breakfast at hotel", "Lunch at local restaurant", "Dinner at recommended venue"],
      accommodations: "Hotel in " + trip.destination,
      city: trip.city || trip.destination
    });
  }

  return fallbackItinerary;
}

export const generatePackingList = internalAction({
  args: { tripId: v.id("trips") },
  handler: async (ctx, args) => {
    const trip = await ctx.runQuery(internal.trips.getTripInternal, { tripId: args.tripId });
    if (!trip) throw new Error("Trip not found");

    try {
      console.log(`Generating packing list for trip to ${trip.destination}`);

      // Always use mock data instead of making actual API calls
      console.log("Using mock implementation for packing list generation");
      const packingList = createMockPackingList(trip);
      await ctx.runMutation(internal.trips.updatePackingList, {
        tripId: args.tripId,
        packingList
      });
    } catch (error) {
      console.error("Error generating packing list:", error);
      // Create a fallback packing list if there's an error
      const fallbackPackingList = createFallbackPackingList(trip);
      await ctx.runMutation(internal.trips.updatePackingList, {
        tripId: args.tripId,
        packingList: fallbackPackingList
      });
    }
  }
});

// Function to create a more detailed mock packing list
function createMockPackingList(trip: Trip) {
  // Base items everyone needs
  const baseItems = [
    "Passport and ID",
    "Travel insurance documents",
    "Flight tickets and boarding passes",
    "Hotel reservation confirmations",
    "Credit cards and cash",
    "Phone and charger",
    "Power adapter",
    "Headphones",
    "Camera",
    "Sunglasses",
    "Medications",
    "First aid kit",
    "Hand sanitizer",
    "Travel pillow",
    "Water bottle"
  ];

  // Clothing items (adjust based on destination)
  const clothingItems = [
    "T-shirts",
    "Shirts/blouses",
    "Pants/jeans",
    "Shorts/skirts",
    "Underwear",
    "Socks",
    "Pajamas",
    "Comfortable walking shoes",
    "Dress shoes",
    "Belt",
    "Light jacket/sweater"
  ];

  // Toiletries
  const toiletries = [
    "Toothbrush and toothpaste",
    "Shampoo and conditioner",
    "Soap/body wash",
    "Deodorant",
    "Razor and shaving cream",
    "Hairbrush/comb",
    "Hair products",
    "Makeup and makeup remover",
    "Skincare products",
    "Sunscreen"
  ];

  // Special items based on interests
  const specialItems: Record<string, string[]> = {
    "beach": ["Swimsuit", "Beach towel", "Flip flops", "Beach bag", "Snorkeling gear"],
    "hiking": ["Hiking boots", "Hiking socks", "Backpack", "Trekking poles", "Insect repellent"],
    "winter": ["Winter coat", "Gloves", "Scarf", "Hat", "Thermal underwear", "Snow boots"],
    "business": ["Business attire", "Laptop and charger", "Business cards", "Portfolio/notebook"],
    "photography": ["Camera equipment", "Extra memory cards", "Tripod", "Camera cleaning kit"]
  };

  // Start with base items
  let packingList = [...baseItems];

  // Add clothing items
  packingList = packingList.concat(clothingItems);

  // Add toiletries
  packingList = packingList.concat(toiletries);

  // Add special items based on interests and destination
  const destination = trip.destination.toLowerCase();
  const interests = trip.interests.map(i => i.toLowerCase());

  // Check for beach destinations
  if (destination.includes('beach') ||
      destination.includes('island') ||
      destination.includes('coast') ||
      interests.some(i => i.includes('beach') || i.includes('swim'))) {
    packingList = packingList.concat(specialItems.beach);
  }

  // Check for hiking/outdoor activities
  if (interests.some(i =>
      i.includes('hik') ||
      i.includes('trek') ||
      i.includes('outdoor') ||
      i.includes('nature') ||
      i.includes('adventure'))) {
    packingList = packingList.concat(specialItems.hiking);
  }

  // Check for winter destinations
  if (destination.includes('ski') ||
      destination.includes('mountain') ||
      interests.some(i => i.includes('ski') || i.includes('snow'))) {
    packingList = packingList.concat(specialItems.winter);
  }

  // Check for business trips
  if (interests.some(i => i.includes('business') || i.includes('work') || i.includes('conference'))) {
    packingList = packingList.concat(specialItems.business);
  }

  // Check for photography interests
  if (interests.some(i => i.includes('photo') || i.includes('camera'))) {
    packingList = packingList.concat(specialItems.photography);
  }

  // Remove duplicates and sort
  return [...new Set(packingList)].sort();
}

// Helper function to create a fallback packing list
function createFallbackPackingList(trip: Trip) {
  return [
    "Clothes appropriate for " + trip.destination,
    "Toiletries",
    "Travel documents (passport, ID, tickets)",
    "Phone and charger",
    "Camera",
    "Comfortable walking shoes",
    "Medications",
    "Travel adapter",
    "Sunscreen",
    "Sunglasses",
    "Hat",
    "Travel pillow",
    "Water bottle",
    "Snacks",
    "Travel guidebook"
  ];
}

export const getTripInternal = internalQuery({
  args: { tripId: v.id("trips") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.tripId);
  }
});

export const updateItinerary = internalMutation({
  args: {
    tripId: v.id("trips"),
    itinerary: v.array(v.object({
      day: v.number(),
      activities: v.array(v.string()),
      meals: v.array(v.string()),
      accommodations: v.string(),
      city: v.optional(v.string())
    }))
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.tripId, { itinerary: args.itinerary });
  }
});

export const updatePackingList = internalMutation({
  args: {
    tripId: v.id("trips"),
    packingList: v.array(v.string())
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.tripId, { packingList: args.packingList });
  }
});

export const deleteTrip = mutation({
  args: {
    tripId: v.id("trips")
  },
  handler: async (ctx, args) => {
    // Check if the trip exists
    const trip = await ctx.db.get(args.tripId);
    if (!trip) {
      throw new Error("Trip not found");
    }

    // Delete the trip
    await ctx.db.delete(args.tripId);
    return true;
  }
});

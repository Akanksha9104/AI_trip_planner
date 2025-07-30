import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
  trips: defineTable({
    userId: v.id("users"),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    destination: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    budget: v.number(),
    interests: v.array(v.string()),
    itinerary: v.optional(v.array(v.object({
      day: v.number(),
      activities: v.array(v.string()),
      meals: v.array(v.string()),
      accommodations: v.string(),
      city: v.optional(v.string())
    }))),
    packingList: v.optional(v.array(v.string())),
    weather: v.optional(v.object({
      temperature: v.number(),
      description: v.string(),
      lastUpdated: v.number()
    })),
    coordinates: v.optional(v.object({
      lat: v.number(),
      lng: v.number()
    }))
  }).index("by_user", ["userId"]),

  accommodations: defineTable({
    tripId: v.id("trips"),
    name: v.string(),
    price: v.number(),
    rating: v.number(),
    location: v.object({
      lat: v.number(),
      lng: v.number()
    }),
    amenities: v.array(v.string())
  }).index("by_trip", ["tripId"])
};

// Define custom auth tables with all possible fields
const customAuthTables = {
  users: defineTable({
    name: v.optional(v.string()),
    tokenIdentifier: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    password: v.optional(v.string()),
    // Add any other fields that might exist in the database
  }),
};

export default defineSchema({
  ...customAuthTables,
  ...applicationTables,
});

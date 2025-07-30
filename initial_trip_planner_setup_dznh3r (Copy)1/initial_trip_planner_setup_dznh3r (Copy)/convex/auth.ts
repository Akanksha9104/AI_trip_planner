import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Simple mock authentication for development
// This avoids JWT key requirements completely

export const auth = {
  // Add routes to the HTTP router
  addHttpRoutes: () => {}
};

// Mock sign-in function
export const signIn = mutation({
  args: {},
  handler: async (ctx) => {
    // Create a mock user
    const userId = await ctx.db.insert("users", {
      name: "Guest User",
      tokenIdentifier: `anonymous:${Date.now()}`,
    });
    return { userId, status: "success" };
  },
});

// Mock sign-out function
export const signOut = mutation({
  args: {},
  handler: async () => {
    return { status: "success" };
  },
});

// Mock store function
export const store = {
  // Add any store functions here
};

// Mock isAuthenticated function
export const isAuthenticated = query({
  args: {},
  handler: async () => {
    return true; // Always return authenticated for development
  },
});

// Mock logged-in user function
export const loggedInUser = query({
  handler: async (ctx) => {
    // Get the first user from the database or create a mock user
    const users = await ctx.db.query("users").collect();
    if (users.length > 0) {
      return users[0];
    }

    // Return a mock user if none exists
    return {
      _id: "mock_user_id",
      name: "Guest User",
      tokenIdentifier: "anonymous:guest"
    };
  },
});

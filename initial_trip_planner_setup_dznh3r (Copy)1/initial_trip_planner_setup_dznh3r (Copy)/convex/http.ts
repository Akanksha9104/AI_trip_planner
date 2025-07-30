import { httpRouter } from "convex/server";
import { auth } from "./auth";

// Create an HTTP router for the Convex HTTP API
const http = httpRouter();

// No authentication routes needed for our simplified approach
// auth.addHttpRoutes(http);

export default http;

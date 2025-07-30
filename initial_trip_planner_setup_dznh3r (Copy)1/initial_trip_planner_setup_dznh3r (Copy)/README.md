# VoyageAI Trip Planner

An AI-powered trip planning application that creates personalized itineraries and packing lists based on your destination and interests.

This project is built with [Convex](https://convex.dev) as its backend and [Vite](https://vitejs.dev/) for the frontend.

## Features

- Create trips with destination, dates, budget, and interests
- Generate detailed city-specific itineraries using OpenAI
- Get personalized packing lists tailored to your destination and activities
- View trip details including day-by-day plans
- Interactive maps for your destinations

## Project structure

- The frontend code is in the `src` directory and is built with React and Vite
- The backend code is in the `convex` directory using Convex functions

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Set up your OpenAI API key (see [OPENAI_SETUP.md](./OPENAI_SETUP.md))
4. Run `npm run dev` to start the frontend and backend servers

## App authentication

This app uses a simplified authentication system for development purposes. In a production environment, you would want to implement a more robust authentication system using [Convex Auth](https://auth.convex.dev/).

## OpenAI Integration

This application uses OpenAI to generate detailed city-specific travel itineraries and packing lists. To set up the OpenAI integration, follow the instructions in [OPENAI_SETUP.md](./OPENAI_SETUP.md).

## Developing and deploying your app

Check out the [Convex docs](https://docs.convex.dev/) for more information on how to develop with Convex.
* If you're new to Convex, the [Overview](https://docs.convex.dev/understanding/) is a good place to start
* Check out the [Hosting and Deployment](https://docs.convex.dev/production/) docs for how to deploy your app
* Read the [Best Practices](https://docs.convex.dev/understanding/best-practices/) guide for tips on how to improve your app further

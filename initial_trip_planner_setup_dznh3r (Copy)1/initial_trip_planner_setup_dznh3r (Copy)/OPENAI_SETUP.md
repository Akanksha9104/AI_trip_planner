# Setting Up OpenAI Integration

This application uses OpenAI to generate detailed city-specific travel itineraries and packing lists. To enable this functionality, you need to set up your OpenAI API key in the Convex environment.

## Steps to Set Up OpenAI API Key

1. **Get an OpenAI API Key**
   - Go to [OpenAI's platform](https://platform.openai.com/signup)
   - Create an account or sign in
   - Navigate to the API section
   - Create a new API key

2. **Add the API Key to Convex Environment**
   - Go to the [Convex Dashboard](https://dashboard.convex.dev)
   - Select your project (`brainy-dolphin-463`)
   - Navigate to "Settings" > "Environment Variables"
   - Add a new environment variable:
     - Key: `OPENAI_API_KEY`
     - Value: Your OpenAI API key (starts with `sk-`)
   - Save the changes

3. **Restart Your Convex Development Server**
   - Stop your current development server
   - Run `npm run dev` to restart with the new environment variable

## Testing the Integration

After setting up the API key, create a new trip in the application. The system will now use OpenAI to generate:

1. A detailed city-specific itinerary with:
   - Local attractions and landmarks
   - Restaurant recommendations
   - Cultural activities
   - Travel tips specific to the destination
   - Local transportation options

2. A comprehensive packing list tailored to:
   - The destination's climate
   - Cultural considerations
   - Your specific interests and activities

## Fallback Mechanism

If the OpenAI API key is not set or there's an error with the API call, the system will automatically fall back to using pre-defined mock data to generate itineraries and packing lists.

## Troubleshooting

If you're experiencing issues with the OpenAI integration:

1. Verify that your API key is correctly set in the Convex environment
2. Check the Convex logs for any error messages
3. Ensure your OpenAI account has sufficient credits
4. Try creating a new API key if the current one isn't working

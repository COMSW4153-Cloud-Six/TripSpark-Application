import { Button } from "./ui/button";
import { Plane, MapPin, Heart, Compass } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border-4 border-primary/30">
            <div className="relative w-12 h-12">
              <Plane className="w-12 h-12 text-primary animate-[fly_3s_ease-in-out_infinite]" />
            </div>
            <h1 className="text-5xl bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">TripSpark</h1>
          </div>
          <p className="text-xl mb-8">
            ✨ Personalized travel recommendations based on your preferences, context, and interests. 
            Discover cities, neighborhoods, and points of interest tailored just for you! 🌍
          </p>
          <Button onClick={onGetStarted} size="lg" className="mb-16 rounded-full shadow-xl hover:scale-105 transition-transform px-12 py-6">
            🚀 Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-lg border-4 border-primary/20 transform hover:scale-105 transition-transform hover:shadow-2xl">
            <div className="bg-primary rounded-full p-4 mb-4 shadow-lg">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <h3 className="mb-2">🎯 Smart Recommendations</h3>
            <p>
              Get personalized suggestions for cities, neighborhoods, and POIs based on your unique preferences
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl shadow-lg border-4 border-secondary/30 transform hover:scale-105 transition-transform hover:shadow-2xl">
            <div className="bg-secondary rounded-full p-4 mb-4 shadow-lg">
              <Heart className="w-12 h-12 text-secondary-foreground" />
            </div>
            <h3 className="mb-2">💖 Your Preferences</h3>
            <p>
              Set your budget, vibe, food interests, and more to receive tailored recommendations
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-lg border-4 border-accent/30 transform hover:scale-105 transition-transform hover:shadow-2xl">
            <div className="bg-accent rounded-full p-4 mb-4 shadow-lg">
              <Compass className="w-12 h-12 text-accent-foreground" />
            </div>
            <h3 className="mb-2">🗺️ Custom Itineraries</h3>
            <p>
              Get ranked POI lists and suggested itineraries with explanations for each recommendation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
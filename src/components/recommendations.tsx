import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Star, MapPin, DollarSign, Clock, Heart, Navigation, BookmarkCheck } from "lucide-react";
import { ImageWithFallback } from "./fallback/ImageWithFallback";
import type { TripPlan } from "./trip-planner";
import type { UserPreferences } from "./user-profile";
import React, { useState, useEffect } from "react";


export interface POI {
  id: string;
  name: string;
  type: string;
  neighborhood: string;
  rating: number;
  priceLevel: string;
  description: string;
  matchReason: string;
  distance: string;
  estimatedTime: string;
  tags: string[];
  imageUrl: string;
}

interface RecommendationsProps {
  tripPlan: TripPlan;
  userPreferences: UserPreferences;
  savedPOIs: string[];
  allPOIs: POI[];
  onToggleSave: (poiId: string) => void;
  onViewSaved: () => void;
  onBack: () => void;
  onNewTrip: () => void;
}

// Mock data generator
export const generateMockPOIs = (destination: string, preferences: UserPreferences): POI[] => {
  const pois: POI[] = [];
  
  // Coffee shops
  if (preferences.foodInterests.includes("Coffee")) {
    pois.push({
      id: "1",
      name: `${destination} Artisan Coffee`,
      type: "Coffee Shop",
      neighborhood: "Downtown",
      rating: 4.8,
      priceLevel: preferences.budgetLevel === "budget" ? "$" : "$$",
      description: "Locally roasted coffee in a cozy atmosphere with excellent pastries",
      matchReason: "Matches your coffee preference; highly rated; walkable location",
      distance: "0.3 miles",
      estimatedTime: "30-45 min",
      tags: ["Coffee", "Breakfast", "Wi-Fi"],
      imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzMTYyNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    });
  }

  // Museums
  if (preferences.activityTypes.includes("Museums")) {
    pois.push({
      id: "2",
      name: `${destination} Art Museum`,
      type: "Museum",
      neighborhood: "Cultural District",
      rating: 4.9,
      priceLevel: preferences.budgetLevel === "luxury" ? "$$$" : "$$",
      description: "World-class collection spanning centuries of art and culture",
      matchReason: "Perfect for museum lovers; matches your cultural vibe; ideal season",
      distance: "1.2 miles",
      estimatedTime: "2-3 hours",
      tags: ["Art", "Culture", "Photography"],
      imageUrl: "https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2MzIwMzM2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    });
  }

  // Fine Dining
  if (preferences.foodInterests.includes("Fine Dining")) {
    pois.push({
      id: "3",
      name: "The Golden Plate",
      type: "Restaurant",
      neighborhood: "Historic Quarter",
      rating: 4.7,
      priceLevel: "$$$",
      description: "Award-winning seasonal menu featuring local ingredients",
      matchReason: "Matches fine dining preference; excellent reviews; romantic ambiance",
      distance: "0.8 miles",
      estimatedTime: "2 hours",
      tags: ["Fine Dining", "Romantic", "Wine"],
      imageUrl: "https://images.unsplash.com/photo-1555242301-090c3211ae73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMGRpbmluZ3xlbnwxfHx8fDE3NjMxMTkwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    });
  }

  // Add some general attractions
  pois.push(
    {
      id: "4",
      name: `${destination} Historic Square`,
      type: "Landmark",
      neighborhood: "Old Town",
      rating: 4.6,
      priceLevel: "Free",
      description: "Beautiful historic plaza with street performers and local vendors",
      matchReason: `Matches your ${preferences.vibes.join(", ")} vibe; free to visit; centrally located`,
      distance: "0.5 miles",
      estimatedTime: "1 hour",
      tags: ["Historic", "Photography", "Architecture"],
      imageUrl: "https://images.unsplash.com/photo-1688048481392-c425462ac4f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjMyMjA5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "5",
      name: "Riverside Park",
      type: "Park",
      neighborhood: "Waterfront",
      rating: 4.5,
      priceLevel: "Free",
      description: "Scenic waterfront park perfect for walks and picnics",
      matchReason: "Great for relaxation; matches nature interests; weather-appropriate",
      distance: "1.5 miles",
      estimatedTime: "1-2 hours",
      tags: ["Nature", "Walking", "Relaxing"],
      imageUrl: "https://images.unsplash.com/photo-1606225278453-eba097f60fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbnMlMjB3b3JsZHxlbnwxfHx8fDE3NjMyMzYzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  );

  return pois;
};

const generateNeighborhoods = (destination: string) => [
  { name: "Downtown", description: "Vibrant urban center with dining and shopping", matchScore: 95 },
  { name: "Cultural District", description: "Museums, galleries, and historic sites", matchScore: 88 },
  { name: "Old Town", description: "Historic architecture and charming streets", matchScore: 85 },
  { name: "Waterfront", description: "Scenic views and outdoor activities", matchScore: 82 },
];

const generateItinerary = (pois: POI[], tripLength: string) => {
  const numDays = tripLength === "1-2" ? 2 : tripLength === "3-4" ? 3 : 5;
  const itinerary = [];

  for (let day = 1; day <= numDays; day++) {
    const dayPOIs = pois.slice((day - 1) * 2, day * 2);
    if (dayPOIs.length > 0) {
      itinerary.push({
        day,
        theme: day === 1 ? "Explore & Settle In" : day === 2 ? "Cultural Immersion" : "Local Favorites",
        pois: dayPOIs
      });
    }
  }

  return itinerary;
};

export function Recommendations({ 
  tripPlan, 
  userPreferences, 
  savedPOIs,
  allPOIs,
  onToggleSave,
  onViewSaved,
  onBack, 
  onNewTrip 
}: RecommendationsProps) {
  const pois = allPOIs;
  const neighborhoods = generateNeighborhoods(tripPlan.destination);
  const itinerary = generateItinerary(pois, tripPlan.tripLength);

  //invoke recommendation api --
  const [sampleMessage, setSampleMessage] = useState("");

  useEffect(() => {
  const userName = userPreferences['name'];

  fetch(`https://recommendation-service-817898523355.us-central1.run.app/recommendation/${userName}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Recommendation API Response:", data);
      setSampleMessage("Loaded Recommendations for "+userName+"!");
    })
    .catch((err) => {
      console.error("Error fetching sample recommendations:", err);
      setSampleMessage("Failed to load recommendations.");
    });
}, []);


  //----end---


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 rounded-full hover:scale-105 transition-transform">
            ← Back
          </Button>
          <div className="bg-gradient-to-r from-white to-primary/5 rounded-3xl p-8 shadow-xl border-4 border-primary/20">
            <h1 className="text-3xl mb-2 flex items-center gap-2">
              ✨ Your Personalized {tripPlan.destination} Experience
            </h1>
            <p className="mb-4 flex items-center gap-2">
              ⏰ {tripPlan.tripLength} days • 🌤️ {tripPlan.season} • 🎨 Tailored for {userPreferences.vibes.join(", ")} vibes
              {savedPOIs.length > 0 && <span className="ml-2">• 💖 {savedPOIs.length} saved</span>}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button 
                size="sm" 
                onClick={onViewSaved} 
                className="rounded-full shadow-md hover:scale-105 transition-transform bg-gradient-to-r from-pink-500 to-red-500"
              >
                <BookmarkCheck className="w-4 h-4 mr-2" />
                View Saved ({savedPOIs.length})
              </Button>
              <Button size="sm" onClick={onNewTrip} className="rounded-full shadow-md hover:scale-105 transition-transform">
                🚀 Plan Another Trip
              </Button>
              <Button size="sm" variant="outline" className="rounded-full hover:scale-105 transition-transform">
                📤 Share Itinerary
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pois" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-auto p-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-primary/20">
            <TabsTrigger value="pois" className="rounded-full data-[state=active]:shadow-lg">📍 POIs</TabsTrigger>
            <TabsTrigger value="neighborhoods" className="rounded-full data-[state=active]:shadow-lg">🏘️ Areas</TabsTrigger>
            <TabsTrigger value="itinerary" className="rounded-full data-[state=active]:shadow-lg">🗓️ Itinerary</TabsTrigger>
          </TabsList>

          {/* POIs Tab */}
          <TabsContent value="pois" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {pois.map((poi) => (
                <Card key={poi.id} className="overflow-hidden border-4 border-primary/10 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] rounded-3xl">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={poi.imageUrl}
                      alt={poi.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => onToggleSave(poi.id)}
                      className="absolute top-3 right-3 bg-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform border-2 border-primary/20"
                    >
                      <Heart
                        className={`w-5 h-5 ${savedPOIs.includes(poi.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </button>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle>{poi.name}</CardTitle>
                      <Badge variant="secondary" className="rounded-full shadow-sm">{poi.type}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      📍 {poi.neighborhood}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{poi.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {poi.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs rounded-full shadow-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{poi.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span>{poi.priceLevel}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>{poi.distance}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-purple-50 px-3 py-1.5 rounded-full">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span>{poi.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 text-sm border-2 border-primary/10">
                      <p>
                        <strong>💡 Why we recommend:</strong> {poi.matchReason}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Neighborhoods Tab */}
          <TabsContent value="neighborhoods" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {neighborhoods.map((neighborhood, index) => (
                <Card key={index} className="border-4 border-secondary/30 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] rounded-3xl">
                  <CardHeader className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-t-3xl">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        🏘️ {neighborhood.name}
                      </CardTitle>
                      <Badge className="rounded-full shadow-md">{neighborhood.matchScore}% match</Badge>
                    </div>
                    <CardDescription>{neighborhood.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full rounded-full hover:scale-105 transition-transform">
                      <Navigation className="w-4 h-4 mr-2" />
                      View on Map
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-6">
            {itinerary.map((day) => (
              <Card key={day.day} className="border-4 border-accent/20 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/10">
                  <CardTitle className="flex items-center gap-2">
                    📅 Day {day.day}: {day.theme}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {day.pois.map((poi, index) => (
                    <div key={poi.id} className="flex gap-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border-2 border-primary/10 hover:shadow-lg transition-shadow">
                      <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <ImageWithFallback
                          src={poi.imageUrl}
                          alt={poi.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4>{poi.name}</h4>
                          <Badge variant="outline" className="text-xs rounded-full shadow-sm">
                            {index === 0 ? "🌅 Morning" : index === 1 ? "☀️ Afternoon" : "🌆 Evening"}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{poi.description}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            {poi.estimatedTime}
                          </span>
                          <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                            <MapPin className="w-3 h-3" />
                            {poi.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      {sampleMessage && (
  <p className="text-center text-sm text-gray-600 mb-2">
    {sampleMessage}
  </p>
)}
    </div>
  );
}

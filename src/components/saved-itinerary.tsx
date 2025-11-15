import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, MapPin, DollarSign, Clock, Heart, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./fallback/ImageWithFallback";

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

interface SavedItineraryProps {
  savedPOIs: POI[];
  onRemovePOI: (poiId: string) => void;
  onBack: () => void;
  tripDestination?: string;
}

export function SavedItinerary({ savedPOIs, onRemovePOI, onBack, tripDestination }: SavedItineraryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 rounded-full hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recommendations
          </Button>
          <div className="bg-gradient-to-r from-white to-pink-50 rounded-3xl p-8 shadow-xl border-4 border-primary/20">
            <h1 className="text-3xl mb-2 flex items-center gap-2">
              💖 Your Saved Itinerary
            </h1>
            <p className="mb-2">
              {savedPOIs.length} {savedPOIs.length === 1 ? 'place' : 'places'} saved
              {tripDestination && ` for your ${tripDestination} trip`}
            </p>
            <p className="text-sm">
              ✨ These are all the places you've hearted. Plan your perfect trip with your favorite spots!
            </p>
          </div>
        </div>

        {/* Saved POIs */}
        {savedPOIs.length === 0 ? (
          <Card className="border-4 border-primary/10 shadow-xl rounded-3xl text-center py-16">
            <CardContent>
              <div className="text-6xl mb-4">💔</div>
              <h2 className="mb-2">No Saved Places Yet</h2>
              <p className="mb-6">
                Start exploring recommendations and heart the places you love!
              </p>
              <Button onClick={onBack} className="rounded-full shadow-lg hover:scale-105 transition-transform">
                Browse Recommendations
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {savedPOIs.map((poi) => (
              <Card key={poi.id} className="overflow-hidden border-4 border-primary/10 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] rounded-3xl">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={poi.imageUrl}
                    alt={poi.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => onRemovePOI(poi.id)}
                    className="absolute top-3 right-3 bg-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform border-2 border-primary/20"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
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
        )}

        {/* Summary Card */}
        {savedPOIs.length > 0 && (
          <Card className="mt-8 border-4 border-accent/30 shadow-xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-t-3xl">
              <CardTitle className="flex items-center gap-2">
                📊 Trip Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-2xl border-2 border-primary/20">
                  <div className="text-3xl mb-1">{savedPOIs.length}</div>
                  <div className="text-sm">Places to Visit</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-2xl border-2 border-secondary/30">
                  <div className="text-3xl mb-1">
                    {savedPOIs.reduce((acc, poi) => {
                      const hours = parseInt(poi.estimatedTime.split('-')[0]) || 1;
                      return acc + hours;
                    }, 0)}h
                  </div>
                  <div className="text-sm">Estimated Time</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border-2 border-accent/30">
                  <div className="text-3xl mb-1">
                    {new Set(savedPOIs.map(poi => poi.type)).size}
                  </div>
                  <div className="text-sm">Activity Types</div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Button className="rounded-full shadow-lg hover:scale-105 transition-transform">
                  📤 Export Itinerary
                </Button>
                <Button variant="outline" className="rounded-full hover:scale-105 transition-transform">
                  🗺️ View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

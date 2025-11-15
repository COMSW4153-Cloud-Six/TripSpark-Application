import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "lucide-react";

export interface TripPlan {
  destination: string;
  season: string;
  tripLength: string;
}

interface TripPlannerProps {
  userName: string;
  onSubmit: (plan: TripPlan) => void;
  onBack: () => void;
}

export function TripPlanner({ userName, onSubmit, onBack }: TripPlannerProps) {
  const [destination, setDestination] = useState("");
  const [season, setSeason] = useState("");
  const [tripLength, setTripLength] = useState("");

  const handleSubmit = () => {
    if (destination && season && tripLength) {
      onSubmit({ destination, season, tripLength });
    }
  };

  const isValid = destination && season && tripLength;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="rounded-full hover:scale-105 transition-transform">
            ← Back to Profile
          </Button>
        </div>

        <Card className="border-4 border-accent/30 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/10 rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              🗺️ Plan Your Trip, {userName}!
            </CardTitle>
            <CardDescription>
              Tell us where you want to go and we'll create personalized recommendations ✈️
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination">🌆 Destination City</Label>
              <Input
                id="destination"
                placeholder="e.g., New York, Paris, Tokyo"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="rounded-xl border-2 border-accent/30 focus:border-accent"
              />
            </div>

            {/* Season */}
            <div className="space-y-2">
              <Label htmlFor="season">🌤️ Season / Time of Visit</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger id="season" className="rounded-xl border-2 border-accent/30">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">🌸 Spring (Mar-May)</SelectItem>
                  <SelectItem value="summer">☀️ Summer (Jun-Aug)</SelectItem>
                  <SelectItem value="fall">🍂 Fall (Sep-Nov)</SelectItem>
                  <SelectItem value="winter">❄️ Winter (Dec-Feb)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Trip Length */}
            <div className="space-y-2">
              <Label htmlFor="tripLength">⏰ Trip Length</Label>
              <Select value={tripLength} onValueChange={setTripLength}>
                <SelectTrigger id="tripLength" className="rounded-xl border-2 border-accent/30">
                  <SelectValue placeholder="Select trip length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">⚡ 1-2 days</SelectItem>
                  <SelectItem value="3-4">🎒 3-4 days</SelectItem>
                  <SelectItem value="5-7">🌟 5-7 days</SelectItem>
                  <SelectItem value="week+">🎉 1 week+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20">
              <Calendar className="w-6 h-6 text-primary" />
              <p className="text-sm">
                💡 We'll factor in weather, seasonality, and popularity to give you the best recommendations!
              </p>
            </div>

            <Button onClick={handleSubmit} disabled={!isValid} className="w-full rounded-full shadow-lg hover:scale-105 transition-transform">
              🎯 Get Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
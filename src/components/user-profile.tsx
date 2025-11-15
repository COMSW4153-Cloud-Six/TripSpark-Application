import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

export interface UserPreferences {
  name: string;
  budgetLevel: string;
  vibes: string[];
  foodInterests: string[];
  activityTypes: string[];
}

interface UserProfileProps {
  onComplete: (preferences: UserPreferences) => void;
}

const VIBE_OPTIONS = ["Relaxed", "Adventure", "Cultural", "Nightlife", "Nature", "Urban", "Historic", "Modern"];
const FOOD_OPTIONS = ["Coffee", "Fine Dining", "Street Food", "Vegetarian", "Seafood", "Local Cuisine", "Bakeries", "Brunch"];
const ACTIVITY_OPTIONS = ["Museums", "Shopping", "Parks", "Architecture", "Live Music", "Sports", "Photography", "Walking Tours"];

export function UserProfile({ onComplete }: UserProfileProps) {
  const [name, setName] = useState("");
  const [budgetLevel, setBudgetLevel] = useState("");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleSubmit = () => {
    if (name && budgetLevel && selectedVibes.length > 0) {
      onComplete({
        name,
        budgetLevel,
        vibes: selectedVibes,
        foodInterests: selectedFoods,
        activityTypes: selectedActivities,
      });
    }
  };

  const isValid = name && budgetLevel && selectedVibes.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="border-4 border-primary/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              ✨ Create Your Travel Profile
            </CardTitle>
            <CardDescription>
              Tell us about your preferences so we can personalize your travel recommendations 🎨
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">👤 Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-2 border-primary/20 focus:border-primary"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">💰 Budget Level</Label>
              <Select value={budgetLevel} onValueChange={setBudgetLevel}>
                <SelectTrigger id="budget" className="rounded-xl border-2 border-primary/20">
                  <SelectValue placeholder="Select budget level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">💵 Budget ($)</SelectItem>
                  <SelectItem value="moderate">💳 Moderate ($$)</SelectItem>
                  <SelectItem value="luxury">💎 Luxury ($$$)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vibes */}
            <div className="space-y-2">
              <Label>🌈 Travel Vibes *</Label>
              <p className="text-sm text-muted-foreground">Select at least one</p>
              <div className="flex flex-wrap gap-2">
                {VIBE_OPTIONS.map((vibe) => (
                  <Badge
                    key={vibe}
                    variant={selectedVibes.includes(vibe) ? "default" : "outline"}
                    className="cursor-pointer rounded-full px-4 py-2 hover:scale-110 transition-transform shadow-md"
                    onClick={() => toggleSelection(vibe, selectedVibes, setSelectedVibes)}
                  >
                    {vibe}
                    {selectedVibes.includes(vibe) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Food Interests */}
            <div className="space-y-2">
              <Label>🍕 Food Interests</Label>
              <div className="flex flex-wrap gap-2">
                {FOOD_OPTIONS.map((food) => (
                  <Badge
                    key={food}
                    variant={selectedFoods.includes(food) ? "default" : "outline"}
                    className="cursor-pointer rounded-full px-4 py-2 hover:scale-110 transition-transform shadow-md"
                    onClick={() => toggleSelection(food, selectedFoods, setSelectedFoods)}
                  >
                    {food}
                    {selectedFoods.includes(food) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Activity Types */}
            <div className="space-y-2">
              <Label>🎭 Activity Types</Label>
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_OPTIONS.map((activity) => (
                  <Badge
                    key={activity}
                    variant={selectedActivities.includes(activity) ? "default" : "outline"}
                    className="cursor-pointer rounded-full px-4 py-2 hover:scale-110 transition-transform shadow-md"
                    onClick={() => toggleSelection(activity, selectedActivities, setSelectedActivities)}
                  >
                    {activity}
                    {selectedActivities.includes(activity) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={!isValid} className="w-full rounded-full shadow-lg hover:scale-105 transition-transform">
              🎉 Save Profile & Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
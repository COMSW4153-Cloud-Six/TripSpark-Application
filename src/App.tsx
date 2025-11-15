import { useState, useMemo } from "react";
import { LandingPage } from "./components/landing-page";
import { UserProfile, UserPreferences } from "./components/user-profile";
import { TripPlanner, TripPlan } from "./components/trip-planner";
import { Recommendations, POI, generateMockPOIs } from "./components/recommendations";
import { SavedItinerary } from "./components/saved-itinerary";
import { Toaster } from "./components/ui/sonner";

type AppState = "landing" | "profile" | "planner" | "recommendations" | "saved";

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [savedPOIIds, setSavedPOIIds] = useState<string[]>([]);

  const handleGetStarted = () => {
    setCurrentState("profile");
  };

  const handleProfileComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setCurrentState("planner");
  };

  const handleTripSubmit = (plan: TripPlan) => {
    setTripPlan(plan);
    setCurrentState("recommendations");
  };

  const handleBackToProfile = () => {
    setCurrentState("profile");
  };

  const handleBackToPlanner = () => {
    setCurrentState("planner");
  };

  const handleNewTrip = () => {
    setTripPlan(null);
    setCurrentState("planner");
  };

  const handleToggleSave = (poiId: string) => {
    setSavedPOIIds(prev => 
      prev.includes(poiId) ? prev.filter(id => id !== poiId) : [...prev, poiId]
    );
  };

  const handleViewSaved = () => {
    setCurrentState("saved");
  };

  const handleBackToRecommendations = () => {
    setCurrentState("recommendations");
  };

  // Generate POIs based on current trip plan
  const allPOIs = useMemo(() => {
    if (tripPlan && userPreferences) {
      return generateMockPOIs(tripPlan.destination, userPreferences);
    }
    return [];
  }, [tripPlan, userPreferences]);

  // Filter saved POIs
  const savedPOIs = useMemo(() => {
    return allPOIs.filter(poi => savedPOIIds.includes(poi.id));
  }, [allPOIs, savedPOIIds]);

  return (
    <div className="min-h-screen">
      {currentState === "landing" && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {currentState === "profile" && (
        <UserProfile onComplete={handleProfileComplete} />
      )}

      {currentState === "planner" && userPreferences && (
        <TripPlanner
          userName={userPreferences.name}
          onSubmit={handleTripSubmit}
          onBack={handleBackToProfile}
        />
      )}

      {currentState === "recommendations" && userPreferences && tripPlan && (
        <Recommendations
          tripPlan={tripPlan}
          userPreferences={userPreferences}
          savedPOIs={savedPOIIds}
          allPOIs={allPOIs}
          onToggleSave={handleToggleSave}
          onViewSaved={handleViewSaved}
          onBack={handleBackToPlanner}
          onNewTrip={handleNewTrip}
        />
      )}

      {currentState === "saved" && tripPlan && (
        <SavedItinerary
          savedPOIs={savedPOIs}
          onRemovePOI={handleToggleSave}
          onBack={handleBackToRecommendations}
          tripDestination={tripPlan.destination}
        />
      )}

      <Toaster />
    </div>
  );
}

"use client";

import PlanetPage from "@/components/PlanetPage";
import { useAuth } from "@/hooks/useAuth";

export default function CreatePlanet() {
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return <PlanetPage />;
}

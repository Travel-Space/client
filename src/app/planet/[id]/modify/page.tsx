"use client";

import PlanetPage from "@/components/PlanetPage";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

export default function ModifyPlanet() {
  const params = useParams();
  const isLoggedIn = useAuth(parseInt(params.id as string), "OWNER");

  if (!isLoggedIn) {
    return null;
  }
  return <PlanetPage planetId={params.id} />;
}

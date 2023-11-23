"use client";

import PlanetPage from "@/components/PlanetPage";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

export default function ModifyPlanet() {
  const params = useParams();
  const isLoggedIn = useAuth(Number(params.id), "ADMIN");

  if (!isLoggedIn) {
    return null;
  }

  return <PlanetPage planetId={params.id} />;
}

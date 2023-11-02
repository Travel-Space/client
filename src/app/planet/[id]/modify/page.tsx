"use client";

import PlanetPage from "@/components/PlanetPage";
import { useParams } from "next/navigation";

export default function ModifyPlanet() {
  const params = useParams();
  return <PlanetPage planetId={params.id} />;
}

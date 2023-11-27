"use client";

import { PLANET_ROLE_NAME } from "@/@types/Planet";
import PlanetPage from "@/components/common/PlanetPage";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

export default function ModifyPlanet() {
  const params = useParams();
  const isLoggedIn = useAuth(Number(params.id), PLANET_ROLE_NAME.ADMIN);

  if (!isLoggedIn) {
    return null;
  }

  return <PlanetPage planetId={Number(params.id)} />;
}

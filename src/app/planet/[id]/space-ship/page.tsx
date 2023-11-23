"use client";

import { PLANET_ROLE_NAME } from "@/@types/Planet";
import SpaceshipPage from "./components";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

export default function Spaceship() {
  const params = useParams();
  const isLoggedIn = useAuth(Number(params.id), PLANET_ROLE_NAME.MEMBER);

  if (!isLoggedIn) {
    return null;
  }

  return <SpaceshipPage />;
}

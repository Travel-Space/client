import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

export function useAuth(planetId?: number) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user && user.memberships && user.memberships.planets) {
      const hasPlanetId = user.memberships.planets.some(
        membership => membership.planetId === planetId && membership.role !== "GUEST",
      );

      if (hasPlanetId) {
        setIsLoggedIn(true);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [user, router]);

  return isLoggedIn;
}

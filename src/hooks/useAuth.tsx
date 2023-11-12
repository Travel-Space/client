import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

export function useAuth(planetId?: number, guardType?: "ADMIN" | "MEMBER") {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    if (!planetId && !guardType && user) {
      setIsLoggedIn(true);
      return;
    }

    const asMember = user.memberships.planets.some(
      membership => membership.planetId === planetId && membership.role !== "GUEST",
    );
    const asAdmin = user.memberships.planets.some(
      membership => membership.planetId === planetId && membership.role !== "GUEST" && membership.role !== "MEMBER",
    );

    if (guardType === "ADMIN") {
      if (asAdmin) {
        setIsLoggedIn(true);
      } else {
        router.push("/");
      }
    } else if (guardType === "MEMBER") {
      if (asMember) {
        setIsLoggedIn(true);
      } else {
        router.push("/");
      }
    }
  }, [user, router, planetId]);

  return isLoggedIn;
}

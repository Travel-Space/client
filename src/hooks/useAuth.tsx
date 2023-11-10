import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

export function useAuth(planetId?: number, guardType?: "OWNER" | "MEMBER") {
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

    const onlyMember = user.memberships.planets.some(
      membership => membership.planetId === planetId && membership.role !== "GUEST",
    );
    const onlyOwner = user.memberships.planets.some(
      membership => membership.planetId === planetId && membership.role !== "GUEST" && membership.role !== "MEMBER",
    );

    if (guardType === "OWNER") {
      if (onlyOwner) {
        setIsLoggedIn(true);
      } else {
        router.push("/");
      }
    } else if (guardType === "MEMBER") {
      if (onlyMember) {
        setIsLoggedIn(true);
      } else {
        router.push("/");
      }
    }
  }, [user, router, planetId]);

  return isLoggedIn;
}

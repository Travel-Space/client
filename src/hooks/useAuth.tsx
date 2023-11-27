import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import MESSAGE from "@/constants/message";
import { PLANET_ROLE, PLANET_ROLE_NAME } from "@/@types/Planet";

export function useAuth(planetId?: number, guardType?: PLANET_ROLE) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!user) {
      alert(MESSAGE.LOGIN.REQUIRED);
      router.push("/");
      return;
    }

    if (!planetId && !guardType && user) {
      setIsLoggedIn(true);
      return;
    }

    const asAdmin = user.memberships.planets.some(
      membership =>
        membership.planetId === planetId &&
        membership.role !== PLANET_ROLE_NAME.GUEST &&
        membership.role !== PLANET_ROLE_NAME.MEMBER,
    );
    const asMember = user.memberships.planets.some(
      membership => membership.planetId === planetId && membership.role !== PLANET_ROLE_NAME.GUEST,
    );

    const roleCheck = (requiredRole: PLANET_ROLE, hasRole: boolean, errorMessage: string) => {
      if (guardType === requiredRole) {
        if (hasRole) {
          setIsLoggedIn(true);
        } else {
          alert(errorMessage);
          router.push("/");
        }
      }
    };
    roleCheck(PLANET_ROLE_NAME.ADMIN, asAdmin, MESSAGE.ERROR.ONLY_ADMIN);
    roleCheck(PLANET_ROLE_NAME.MEMBER, asMember, MESSAGE.ERROR.ONLY_MEMBER);
  }, [user, router, planetId]);

  return isLoggedIn;
}

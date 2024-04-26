import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import MESSAGE from "@/constants/message";
import { PLANET_ROLE, PLANET_ROLE_NAME } from "@/@types/Planet";

/**
 *
 * @param planetId : 특정 행성 접근
 * @param guardType : 접근 가능한 권한들
 * @returns
 */

export function useAuth(planetId?: number, guardType?: PLANET_ROLE[]) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 비회원 접근 제한
    if (!user) {
      alert(MESSAGE.LOGIN.REQUIRED);
      router.push("/");
      return;
    }
    // 회원 + 멤버가 아닐 때
    if (!planetId && !guardType && user) {
      setIsLoggedIn(true);
      return;
    }

    // 특정 행성 멤버별 접근 제한
    const thisPlanet = user.memberships.planets.find(membership => membership.planetId === planetId);
    if (thisPlanet && guardType?.includes(thisPlanet?.role)) {
      setIsLoggedIn(true);
    } else {
      if (guardType?.includes(PLANET_ROLE_NAME.MEMBER)) {
        // 행성 멤버 접근 허용
        alert(MESSAGE.ERROR.ONLY_MEMBER);
      } else {
        // 행성 관리자 접근 허용
        alert(MESSAGE.ERROR.ONLY_ADMIN);
      }
      router.push("/");
    }
  }, [user, router, planetId]);

  return isLoggedIn;
}

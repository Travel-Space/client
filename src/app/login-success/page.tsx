"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { UserRole } from "@/@types/User";

export default function LoginSuccess() {
  const setAuth = useSetRecoilState(userAtom);
  const router = useRouter();
  const urlParams = useSearchParams();
  const idString = urlParams.get("id");
  const roleString = urlParams.get("role");
  const nickName = urlParams.get("nickName");
  const membershipsString = urlParams.get("memberships");

  useEffect(() => {
    if (idString && roleString && nickName && membershipsString) {
      const id = parseInt(idString);
      const role = roleString as UserRole;
      const memberships = JSON.parse(decodeURIComponent(membershipsString));

      setAuth({
        isAuth: true,
        id,
        role,
        nickName,
        memberships,
      });

      router.push("/");
    }
  }, []);

  return <></>;
}

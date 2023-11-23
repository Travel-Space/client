"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { UserRole } from "@/@types/User";

export default function LoginSuccess() {
  const [auth, setAuth] = useRecoilState(userAtom);
  const router = useRouter();
  const urlParams = useSearchParams();
  const idString = urlParams.get("id");
  const roleString = urlParams.get("role");
  const nickName = urlParams.get("nickName");
  const membershipsString = urlParams.get("memberships");

  useEffect(() => {
    if (idString && roleString && nickName && membershipsString) {
      const id = Number(idString);
      const role = roleString as UserRole;
      const memberships = JSON.parse(decodeURIComponent(membershipsString));

      setAuth({
        isAuth: true,
        id,
        role,
        nickName,
        memberships,
      });
    }
  }, [idString, roleString, nickName, membershipsString, setAuth]);

  useEffect(() => {
    if (auth && auth.isAuth) {
      const redirectToHome = async () => {
        console.log(auth);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push("/");
      };

      redirectToHome();
    }
  }, [auth, router]);

  return <></>;
}

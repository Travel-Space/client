import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

export function useAuth() {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      router.push("/");
    }
  }, [user, router]);

  return isLoggedIn;
}

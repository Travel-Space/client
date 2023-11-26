import { useRecoilValue } from "recoil";
import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

import { userAtom } from "@/recoil/atoms/user.atom";

const useSocket = (type: string) => {
  const socketUri =
    type === "CHAT"
      ? `${process.env.NEXT_PUBLIC_SOCKET_CHAT_URI}`
      : `${process.env.NEXT_PUBLIC_SOCKET_NOTIFICATION_URI}`;

  console.log("소켓 uri - ", socketUri);
  console.log("채팅 env - ", process.env.NEXT_PUBLIC_SOCKET_CHAT_URI);
  console.log("알림 env - ", process.env.NEXT_PUBLIC_SOCKET_NOTIFICATION_URI);
  console.log("구글 맵 api env - ", process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  console.log("국가 env - ", process.env.NEXT_PUBLIC_COUNTRY_API_KEY);

  const user = useRecoilValue(userAtom);

  const socket = useMemo(
    () =>
      io(`${socketUri}-${user?.id}`, {
        reconnectionDelayMax: 10000,
        withCredentials: true,
        autoConnect: false,
      }),
    [user?.id],
  );

  useEffect(() => {
    if (user?.id) {
      socket.connect();
    }
  }, [user?.id, socket]);

  return socket;
};

export default useSocket;

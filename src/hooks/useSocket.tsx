import { useRecoilValue } from "recoil";
import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

import { userAtom } from "@/recoil/atoms/user.atom";

const useSocket = (type: string) => {
  const socketUri =
    type === "CHAT"
      ? `${process.env.NEXT_PUBLIC_SOCKET_CHAT_URI}`
      : `${process.env.NEXT_PUBLIC_SOCKET_NOTIFICATION_URI}`;

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

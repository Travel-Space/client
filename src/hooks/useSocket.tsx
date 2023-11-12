import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (type: string, userId?: number) => {
  const socketUri =
    type === "CHAT" ? process.env.NEXT_PUBLIC_SOCKET_CHAT_URI : process.env.NEXT_PUBLIC_SOCKET_NOTIFICATION_URI;

  const socket = io(`${socketUri}-${userId}`, {
    reconnectionDelayMax: 10000,
    withCredentials: true,
  });

  useEffect(() => {
    if (socket) socket.connect();
  }, [socket]);

  return socket;
};

export default useSocket;

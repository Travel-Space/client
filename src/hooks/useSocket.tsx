import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URI}`, {
    reconnectionDelayMax: 10000,
    withCredentials: true,
  });

  useEffect(() => {
    if (socket) socket.connect();
  });

  return socket;
};

export default useSocket;

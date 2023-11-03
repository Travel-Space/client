import { io } from "socket.io-client";

const useSocket = () => {
  const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URI}`, {
    reconnectionDelayMax: 10000,
    withCredentials: true,
  });

  return socket;
};

export default useSocket;

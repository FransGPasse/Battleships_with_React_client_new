import { createContext, useContext } from "react";
import socketio from "socket.io-client";

const RoomContext = createContext();
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL);

export const useRoomContext = () => {
  return useContext(RoomContext);
};

const RoomContextProvider = ({ children }) => {
  const values = {
    socket,
  };

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
};

export default RoomContextProvider;

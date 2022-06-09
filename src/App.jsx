import { Routes, Route } from "react-router-dom";
import "./assets/App.scss";

import { useState, useEffect } from "react";

import JoinPage from "./pages/JoinPage";
import GamePage from "./pages/GamePage";
import LoserScreen from "./components/LoserScreen";
import WinnerScreen from "./components/WinnerScreen";

import { useRoomContext } from "./contexts/RoomContextProvider";

function App() {
  const { socket } = useRoomContext();
  const [disconnected, setDisconnected] = useState();

  useEffect(() => {
    socket.on("user_disconnected", () => {
      setDisconnected(true);
    });
  }, [socket]);

  if (disconnected)
    return (
      <div className="disconnect-page">
        <h1 className="disconnect-msg">The other user disconnected...</h1>
      </div>
    );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/battleships" element={<GamePage />} />
        <Route path="/win" element={<WinnerScreen />} />
        <Route path="/loss" element={<LoserScreen />} />
      </Routes>
    </div>
  );
}

export default App;

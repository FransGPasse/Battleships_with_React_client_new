import { Routes, Route } from "react-router-dom";
import "./assets/App.scss";

import { useState, useEffect } from "react";

import JoinPage from "./pages/JoinPage";
import GamePage from "./pages/GamePage";
import OccupiedScreen from "./components/OccupiedScreen";

import { useRoomContext } from "./contexts/RoomContextProvider";

function App() {
  const { socket } = useRoomContext();
  const [disconnected, setDisconnected] = useState();
  const [occupied, setOccupied] = useState()

  useEffect(() => {
    socket.on("user_disconnected", () => {
      setDisconnected(true);
    });
  }, [socket]); 

  useEffect(() => {
    socket.on("occupied_game", () => {
      setOccupied(true);
    })
  }, [socket])

  if (disconnected)
    return (
      <div className="disconnect-page">
        <h1 className="disconnect-msg">The other user disconnected...</h1>
      </div>
    );

  if (occupied) 
      return (
        <>
        <OccupiedScreen />
        </>
      )

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/battleships" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../contexts/RoomContextProvider";

//Joinpage-sidan
export default function JoinPage() {
  const { socket } = useRoomContext();
  const navigate = useNavigate();

  //Sätter state för ifall man väntar på en motståndare
  const [waiting, setWaiting] = useState(false);

  //Sätter state för ifall båda spelarna är redo
  const [connected, setConnected] = useState(false);

  //Tar hand om när knappen (formuläret) klickas på och säger till servern att en spelare vill joina
  const handleJoin = (e) => {
    e.preventDefault();
    console.log(`User with id '${socket.id}' connected`);

    socket.emit("user_connected", socket.id);
  };

  //Skickar waiting till servern och sätter waiting till true
  useEffect(() => {
    socket.on("waiting", () => setWaiting(true));
  }, [socket]);

  //Lyssnar efter start game från servern och sätter connected till true
  useEffect(() => {
    socket.on("start_game", () => {
      setWaiting(false);
      setConnected(
        true,
        setTimeout(() => {
          navigate("/battleships");
        }, 2000)
      );
    });
  }, [socket, navigate]);

  if (waiting) {
    return (
      <div className="joinpage-container">
        <h1 className="joinpage-title">Waiting...</h1>
        <div class="loading-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (connected) {
    return (
      <div className="joinpage-container">
        <h1 className="joinpage-title">Connected!</h1>
      </div>
    );
  }

  return (
    <div className="joinpage-container">
      <h1 className="joinpage-title">Battleships!</h1>
      <h3>Click below to play</h3>
      <button className="button joinpage-btn" onClick={handleJoin}>
        Join the game
      </button>
    </div>
  );
}

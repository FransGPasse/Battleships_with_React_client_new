import useGetShips from "../hooks/useGetShips";
import { useState, useEffect } from "react";
import { useRoomContext } from "../contexts/RoomContextProvider";

export default function MyGameBoard() {
  const { socket } = useRoomContext();
  const [ready, setReady] = useState(false);
  const [myTurn, setMyTurn] = useState(false);
  const myBoard = useGetShips();

  const playerReady = () => {
    setReady(true);
    socket.emit("player_ready", socket.id);
  };

  const generateShips = () => {
    myBoard.placeAllShips();
  };

  //Skickar över koordinaterna för lådan som klickats på
  const clickedBox = (event) => {
    socket.emit("clicked_box", event.target);
  };

  useEffect(() => {
    socket.on("your_turn", () => {
      setMyTurn(true);
      console.log("Min tur är lika med:", myTurn);
    });
  }, [socket]);

  return (
    <div className="gameboard my-board">
      <div className="button-wrapper">
        <button
          disabled={ready === true}
          onClick={generateShips}
          className="button generate-ships-btn"
        >
          Place your ships!
        </button>
        <button
          disabled={ready === true}
          onClick={playerReady}
          className="button place-ships-btn"
        >
          Click me when you are ready to play!
        </button>
      </div>

      {myBoard.battleboard.map((row, y) => (
        <div className="row" key={y}>
          {row.map((box, x) => {
            return (
              <div
                className={`box my-box ${box ? "my-ship" : ""}`}
                key={x}
                onClick={clickedBox}
              >
                {x}:{y}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

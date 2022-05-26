import useGetShips from "../hooks/useGetShips";
import { useState } from "react";

export default function MyGameBoard() {
  const [ready, setReady] = useState(false);
  const myBoard = useGetShips();

  const playerReady = () => {
    setReady(true);
  };

  const generateShips = () => {
    myBoard.placeAllShips();
  };

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
              <div className={`box my-box ${box ? "my-ship" : ""}`} key={x}>
                {x}:{y}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

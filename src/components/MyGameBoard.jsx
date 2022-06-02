import useGetShips from "../hooks/useGetShips";
import { useState, useEffect } from "react";
import { useRoomContext } from "../contexts/RoomContextProvider";

export default function MyGameBoard() {
  //Hämtar kontextet för rummet, a.k.a anslutningen till socket.io
  const { socket } = useRoomContext();

  //State som kollar om båda spelarna är redo
  const [ready, setReady] = useState(false);

  //State om det är min tur
  const [myTurn, setMyTurn] = useState(false);

  //State om det inte är min tur
  const [waitingForTurn, setWaitingForTurn] = useState(false);

  let myBoard = useGetShips();

  const playerReady = () => {
    setReady(true);
    socket.emit("player_ready", socket.id);
  };

  const generateShips = () => {
    myBoard.placeAllShips();
  };

  useEffect(() => {
    socket.on(
      "you_start",
      () => setMyTurn(true),
      console.log("Is it my turn? ", myTurn)
    );
  }, [socket, myTurn]);

  useEffect(() => {
    socket.on(
      "not_your_turn",
      () => setWaitingForTurn(true),
      console.log("Am I waiting for my turn?", waitingForTurn)
    );
  }, [socket, waitingForTurn]);

  //Kolla ifall det var en träff eller inte
  useEffect(() => {
    socket.on("hit_or_miss", (slicedBoxID, socketID) => {
      let clickedBox = document.querySelector(`#${slicedBoxID}`);

      if (clickedBox.classList.contains("my-ship")) {
        console.log("Hit! 💥");
      } else {
        console.log("Miss! ❌");
      }
    });
  }, [socket, myTurn, myBoard]);

  /*   useEffect(() => {
    socket.on("hit_ship", () => {
      console.log("Hit! 💥");
    });
  }, [socket]);

  useEffect(() => {
    socket.on("missed_ship", () => {
      console.log("Miss! ❌");
    });
  }, [socket]);
 */
  //Returnerar detta om det är min tur att spela
  if (myTurn) {
    return (
      <div className="gameboard my-board">
        <div className="my-turn">
          <h2>It's your turn!</h2>
          <h3>
            Click on one of your <span>opponents</span> squares to attack...
          </h3>
        </div>

        {myBoard.battleboard.map((row, y) => (
          <div className="row" key={y}>
            {row.map((box, x) => {
              return (
                <div
                  className={`box my-box ${box ? "my-ship" : ""}`}
                  key={x}
                  id={`box-${x}-${y}`}
                >
                  {x}-{y}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  //Returnerar detta om det inte är min tur att spela
  if (waitingForTurn) {
    return (
      <div className="gameboard my-board">
        <h2>It's your opponent's turn!</h2>
        <p>Wait for them to finish their round...</p>
        {myBoard.battleboard.map((row, y) => (
          <div className="row" key={y}>
            {row.map((box, x) => {
              return (
                <div
                  className={`box my-box ${box ? "my-ship" : ""}`}
                  key={x}
                  id={`box-${x}-${y}`}
                >
                  {x}-{y}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

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
                id={`box-${x}-${y}`}
              >
                {x}-{y}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

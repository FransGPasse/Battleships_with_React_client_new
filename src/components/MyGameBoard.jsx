import useGetShips from "../hooks/useGetShips";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../contexts/RoomContextProvider";

export default function MyGameBoard() {
  //Hämtar kontextet för rummet, a.k.a anslutningen till socket.io
  const { socket } = useRoomContext();

  //State som kollar om skeppen har placerats ut
  const [placedShips, setPlacedShips] = useState(false);

  //State som kollar om båda spelarna är redo
  const [ready, setReady] = useState(false);

  //State om det är min tur
  const [myTurn, setMyTurn] = useState(false);

  // State som säger hur många skepp man har kvar
  const [shipsLeft, setShipsLeft] = useState(null);

  if (shipsLeft === 0) {
    socket.emit("you_lose", socket.id)
  }

  const navigate = useNavigate();

  //Sätter variabeln myBoard till hela objektet som man får tillbaka från useGetShips()
  let myBoard = useGetShips();

  //Funktion som säger att spelaren med socket.id är redo
  const playerReady = () => {
    setReady(true);
    socket.emit("player_ready", socket.id);
  };

  //Genererar ett osynligt "bräde" som består av tio arrayer med skeppen utplacerade
  const generateShips = () => {
    myBoard.placeAllShips();
    setPlacedShips(true);
    setShipsLeft(4);
  };

  //useEffect för om man börjar
  useEffect(() => {
    socket.on("you_start", () => setMyTurn(true));
  }, [socket, myTurn]);

  //useEffect för om man inte börjar
  useEffect(() => {
    socket.on("not_your_start", () => setMyTurn(false));
  }, [socket, myTurn]);

  //Kolla ifall det var en träff eller inte
  useEffect(() => {
    const handleHitOrMiss = (slicedBoxID, socketID) => {
      //Skapar en variabel som motsvarar den klickade lådan i DOM
      let clickedBox = document.querySelector(`#${slicedBoxID}`);
      const slicedShipBox = slicedBoxID.slice(4, 8)
      const [y, x] = slicedShipBox.split("-")
      const x_coord = parseInt(x)
      const y_coord = parseInt(y)

      //Låter hitShip vara falsk tills vidare
      let hitShip = false;

      //Kollar ifall den klickade lådan har klassen "my-ship" och lägger isåfall till klassen "hit" och ändrar hitShip till true
      if (clickedBox.classList.contains("my-ship")) {
        hitShip = true;
        clickedBox.classList.add("hit");

        const ships = myBoard.checkIfShipSunk(x_coord, y_coord)
        setShipsLeft(ships)

        //Annars lägger till klassen "miss"
      } else {
        clickedBox.classList.add("miss");
      }

      //Skickar ut ships_response samt ID:t på lådan + sant/falskt beroende på träff eller ej
      socket.emit("ship_response", slicedBoxID, hitShip, socketID);
    }

    socket.on("hit_or_miss", handleHitOrMiss);

    return () => {
      socket.off("hit_or_miss", handleHitOrMiss);
    }
  }, [socket, myBoard]);

  // listen for changes to your ship
  useEffect(() => {
    socket.emit("ship_change", shipsLeft, socket.id)
  }, [setShipsLeft, shipsLeft, socket])

  // Ändra myTurn så att rätt meddelande visas
  useEffect(() => {
    socket.on("your_turn_to_shoot", () => {
      setMyTurn(true);
    });
  }, [socket]);

  // Ändra myTurn så att rätt meddelande visas
  useEffect(() => {
    socket.on("not_your_turn_to_shoot", () => {
      setMyTurn(false);
    });
  }, [socket]);

  //Lyssnar efter "you_win" emit från servern
  useEffect(() => {
    socket.on("you_win", () => {
      navigate("/win");
    });
  }, [socket, navigate]);

  // Lyssna efter "you_lose"
  useEffect(() => {
    socket.on("you_lose", () => {
      navigate("/loss");
    });
  }, [socket, navigate]);

  return (
    <div className="gameboard my-board">
      {ready === false && (
        <>
          <h1 className="gamepage-title">Battleships </h1>
          <div className="button-wrapper">
            <button
              disabled={ready === true}
              onClick={generateShips}
              className="button generate-ships-btn"
            >
              Place your ships!
            </button>
            <button
              disabled={placedShips === false}
              onClick={playerReady}
              className="button place-ships-btn"
            >
              Click me when you are ready to play!
            </button>
          </div>
        </>
      )}

      {ready &&
        (myTurn ? (
          <div className="my-turn">
            <h2>It's your turn!</h2>
            <h3>
              Click on one of your <span>opponents</span> squares to attack...
            </h3>
          </div>
        ) : (
          <>
            <h2>Waiting...</h2>
          </>
        ))}

      {shipsLeft && ready && <p> Ships left: {shipsLeft} </p>}

      {myBoard.battleboard.map((row, y) => (
        <div className="row" key={y}>
          {row.map((box, x) => {
            return (
              <div
                className={`box my-box ${box ? "my-ship" : ""}`}
                key={x}
                id={`box-${y}-${x}`}
              >
                {y}-{x}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

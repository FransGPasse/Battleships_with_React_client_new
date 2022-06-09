import { useEffect, useState /* useRef */ } from "react";
import { useRoomContext } from "../contexts/RoomContextProvider";

export default function OpponentGameBoard({ opponentBoard }) {
  const { socket } = useRoomContext();

  // state to see if I can shoot or not
  const [canShoot, setCanShoot] = useState(false);

  // state to see how many ships my opponent has left
  const [opponentShipsLeft, setOpponentShipsLeft] = useState(0);

  //Skickar med ID:t för eventet på klick, samt socketens ID
  const clickedBox = (e) => {
    //Kollar ifall rutan redan klickats på och tar isåfall bort eventListenern
    if (
      e.target.classList.contains("hit") ||
      e.target.classList.contains("miss")
    ) {
      e.target.removeEventListener();
    }

    socket.emit("clicked_box", e.target.id, socket.id);
  };

  // Lyssnar på servern om jag får börja skjuta
  useEffect(() => {
    socket.on("you_start", () => setCanShoot(true));
  }, [socket, canShoot]);

  // Lyssnar på servern om min motståndare får börja skjuta
  useEffect(() => {
    socket.on("not_your_start", () => setCanShoot(false));
  }, [socket, canShoot]);

  // När det kommer en träff/miss, låt mig skjuta
  useEffect(() => {
    socket.on("your_turn_to_shoot", () => {
      setCanShoot(true);
    });
  }, [socket]);

  //Lyssnar efter svar från servern på om det var en träff eller miss och lägger till korresponderande klass
  useEffect(() => {
    socket.on("server_ship_response", (clickedBoxID, hitShip) => {
      setCanShoot(false);
      //Skapar variabel för den klickade lådan och hittar den med en querySelector
      let clickedBox = document.querySelector(`#${clickedBoxID}`);

      if (hitShip === true) {
        clickedBox.classList.add("hit");
      } else {
        clickedBox.classList.add("miss");
      }
    });
  }, [socket]);

  // listen for changes in opponents ship
  useEffect(() => {
    socket.on("ship_change", (shipsLeft) => {
      setOpponentShipsLeft(shipsLeft);
    });
  });

  return (
    <>
      <div className="gameboard opponent-board">
        <p> Opponent ships left: {opponentShipsLeft} </p>
        {opponentBoard.map((row, y) => (
          <div className="row" key={y}>
            {row.map((box, x) => {
              return (
                <div
                  className="box opponent-box"
                  //Lägger till "opp-" innan box så att alla lådor har unika ID:n
                  id={`opp-box-${y}-${x}`}
                  key={x}
                  onClick={canShoot ? clickedBox : undefined}
                >
                  {y}-{x}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

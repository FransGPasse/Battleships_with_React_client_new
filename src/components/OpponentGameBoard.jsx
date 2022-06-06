import { useEffect, useState } from "react";
import { useRoomContext } from "../contexts/RoomContextProvider";

export default function OpponentGameBoard({ opponentBoard }) {
  const { socket } = useRoomContext();
  
  // state to see if I can shoot or not
  const [canShoot, setCanShoot] = useState(false)

  //Skickar med ID:t för eventet på klick, samt socketens ID
  const clickedBox = (e) => {
    socket.emit("clicked_box", e.target.id, socket.id);
  };

  // Lyssnar på servern om jag får börja skjuta
  useEffect(() => {
    socket.on(
      "you_start",
      () => setCanShoot(true),
      console.log("Can I shoot?", canShoot)
    );
  }, [socket, canShoot]);

  // Lyssnar på servern om min motståndare får börja skjuta
  useEffect(() => {
    socket.on(
      "not_your_start",
      () => setCanShoot(false),
      console.log("Am I waiting for my turn to shoot?", canShoot)
    );
  }, [socket, canShoot]);

  // När det kommer en träff/miss, låt mig skjuta
  useEffect(() => {
    socket.on("your_turn_to_shoot", () => {
     setCanShoot(true)
    });
  }, [socket]);

  //Lyssnar efter svar från servern på om det var en träff eller miss och lägger till korresponderande klass
  useEffect(() => {
    socket.on("server_ship_response", (clickedBoxID, hitShip) => {
      setCanShoot(false)
      //Skapar variabel för den klickade lådan och hittar den med en querySelector
      let clickedBox = document.querySelector(`#${clickedBoxID}`);

      if (hitShip === true) {
        clickedBox.classList.add("hit");
      } else {
        clickedBox.classList.add("miss");
      }
    });
  }, [socket]);

  return (
    <>
      <div className="gameboard opponent-board">
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

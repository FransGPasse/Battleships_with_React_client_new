import { useEffect } from "react";
import { useRoomContext } from "../contexts/RoomContextProvider";

export default function OpponentGameBoard({ opponentBoard }) {
  const { socket } = useRoomContext();

  //Skickar med ID:t för eventet på klick, samt socketens ID
  const clickedBox = (e) => {
    socket.emit("clicked_box", e.target.id, socket.id);
  };

  //Lyssnar efter svar från servern på om det var en träff eller miss och lägger till korresponderande klass
  useEffect(() => {
    socket.on("server_ship_response", (clickedBoxID, hitShip) => {
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
                  onClick={clickedBox}
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

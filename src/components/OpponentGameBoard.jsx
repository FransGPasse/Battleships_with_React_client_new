import { useRoomContext } from "../contexts/RoomContextProvider";

export default function OpponentGameBoard({ opponentBoard }) {
  const { socket } = useRoomContext();

  const clickedBox = (e) => {
    socket.emit("clicked_box", e.target.id, socket.id);
  };

  return (
    <>
      <div className="gameboard opponent-board">
        {opponentBoard.map((row, y) => (
          <div className="row" key={y}>
            {row.map((box, x) => {
              return (
                <div
                  className="box opponent-box"
                  id={`opp-box-${x}-${y}`}
                  key={x}
                  onClick={clickedBox}
                >
                  {x}-{y}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

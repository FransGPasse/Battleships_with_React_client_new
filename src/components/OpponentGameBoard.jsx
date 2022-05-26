import React from "react";

export default function OpponentGameBoard({ opponentBoard }) {
  const clickedBox = (e) => {
    console.log("Clicked on", e.target.id);
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
                  id={`${x}:${y}`}
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
    </>
  );
}

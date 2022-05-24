import React from "react";

export default function OpponentGameBoard() {
  const battleships = [
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
  ];

  return (
    <>
      <div className="gameboard opponent-board">
        {React.Children.toArray(
          battleships.map((ship) => (
            <div className="row">
              {React.Children.toArray(
                ship.map((item) => (
                  <div className="box opponent-box">{item}</div>
                ))
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

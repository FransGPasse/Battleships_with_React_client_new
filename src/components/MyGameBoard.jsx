import React from "react";

export default function MyGameBoard({ myBoard }) {
  /*   const battleships = [
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
      <div className="gameboard my-gameboard">
        {React.Children.toArray(
          battleships.map((ship) => (
            <div className="row">
              {React.Children.toArray(
                ship.map((item) => <div className="box my-box">{item}</div>)
              )}
            </div>
          ))
        )}
      </div>
    </>
  ); */

  console.log(myBoard);

  console.log("Här är den spreadade", [...myBoard[0]]);

  return (
    <div className="gameboard my-gameboard">
      {myBoard.forEach(
        (row) => (
          <div className="row">
            {row.map((element) => {
              <div className="box my-box">{element}</div>;
            })}
          </div>
        )

        // <div className="row">
        //   {row.map((box) => (
        //     <div className="box my-box">{box}</div>
        //   ))}
        // </div>
      )}
    </div>
  );
}

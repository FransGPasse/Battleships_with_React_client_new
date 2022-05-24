import MyGameBoard from "../components/MyGameBoard";
import OpponentGameBoard from "../components/OpponentGameBoard";

import useGetShips from "../hooks/useGetShips";
import { useEffect } from "react";

export default function GamePage() {
  const myBoard = useGetShips();

  useEffect(() => {
    myBoard.placeAllShips();
  }, []);

  console.table(myBoard);
  console.table(myBoard.battleboard);

  return (
    <>
      <h1 className="title">Battleships 🚢💣</h1>
      <div className="gamepage-container">
        <MyGameBoard myBoard={myBoard.battleboard} />
        <OpponentGameBoard />
      </div>
    </>
  );
}

import MyGameBoard from "../components/MyGameBoard";
import OpponentGameBoard from "../components/OpponentGameBoard";

import useGetShips from "../hooks/useGetShips";

export default function GamePage() {
  const opponentBoard = useGetShips();

  return (
    <div className="gamepage-container">
      <h1 className="gamepage-title">Battleships </h1>
      <div className="gameboards-wrapper">
        <MyGameBoard />
        <OpponentGameBoard opponentBoard={opponentBoard.gameboard()} />
      </div>
    </div>
  );
}

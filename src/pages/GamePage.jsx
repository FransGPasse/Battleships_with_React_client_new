import MyGameBoard from "../components/MyGameBoard"
import OpponentGameBoard from "../components/OpponentGameBoard"

import useGetShips from "../hooks/useGetShips"
// import { useEffect } from "react"

export default function GamePage() {
	const opponentBoard = useGetShips()

	return (
		<>
			<h1 className="title">Battleships 🚢💣</h1>
			<div className="gamepage-container">
				<MyGameBoard />
				<OpponentGameBoard opponentBoard={opponentBoard.gameboard()} />
			</div>
		</>
	)
}

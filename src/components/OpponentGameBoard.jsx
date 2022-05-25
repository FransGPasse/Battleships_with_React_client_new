import React from "react"

export default function OpponentGameBoard({ opponentBoard }) {
	return (
		<>
			<div className="gameboard opponent-board">
				{opponentBoard.map((row, y) => (
					<div className="row" key={y}>
						{row.map((box, x) => {
							// console.log(`This is a box at ${x}:${y}`, box)
							return (
								<div className="box opponent-box" key={x}>
									{x}:{y}
								</div>
							)
						})}
					</div>
				))}
			</div>
		</>
	)
}

export default function MyGameBoard({ myBoard }) {
	return (
		<div className="gameboard my-battleboard">
			{myBoard.map((row, y) => (
				<div className="row" key={y}>
					{row.map((box, x) => {
						// console.log(`This is a box at ${x}:${y}`, box)
						return (
							<div
								className={`box my-box ${box ? "my-ship" : ""}`}
								key={x}
							>
								{x}:{y}
							</div>
						)
					})}
				</div>
			))}
		</div>
	)
}

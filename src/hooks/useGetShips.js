import { useState } from "react"

const gameboard = () => {
	return [
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null],
	]
}

const ships = [
	{
		name: "carrier",
		length: 4,
		sunk: false,
	},
	{
		name: "battleship",
		length: 3,
		sunk: false,
	},
	{
		name: "cruiser",
		length: 2,
		sunk: false,
	},
	{
		name: "destroyer",
		length: 2,
		sunk: false,
	},
]

const useGetShips = () => {
	const [battleboard, setBattleboard] = useState(gameboard)

	// generate starting position
	const generateStartingIndex = () => {
		return Math.floor(Math.random() * 10)
	}

	const placeAllShips = () => {
		ships.forEach((ship) => placeShip(ship))
		// console.table(battleboard)
	}

	const placeShip = (ship) => {
		const startingX = generateStartingIndex()
		const startingY = generateStartingIndex()
		let occupied = false
		// const currentShipSpaceY = startingY + ship.length

		// check if no ship in startingposition and inside board
		if (
			battleboard[startingY][startingX] === null &&
			10 > startingX + ship.length
		) {
			// check if any of the ships parts is interfearing with another ship
			for (let i = startingX; i <= startingX + ship.length; i++) {
				// if you find ship anywhere, change occupied
				if (battleboard[startingY][i] !== null) {
					occupied = true
				}
			}

			// if no ship-part found, place ship there
			if (!occupied) {
				const newBattleboard = [...battleboard]
				newBattleboard[startingY].fill(
					ship,
					startingX,
					startingX + ship.length
				)

				setBattleboard(newBattleboard)
				return
			}
		}
		// if any of the criterias fail, call function again to get new coordinates
		placeShip(ship)
	}

	return {
		battleboard,
		placeAllShips,
	}
}

export default useGetShips

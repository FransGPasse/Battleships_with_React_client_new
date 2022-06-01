import { useState } from "react";

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
  ];
};

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
];

const useGetShips = () => {
  const [battleboard, setBattleboard] = useState(gameboard);

  // generate starting position
  const generateStartingIndex = () => {
    return Math.floor(Math.random() * 10);
  };

  const placeAllShips = () => {
    let emptyBattleboard = gameboard();
    ships.forEach((ship) => placeShip(emptyBattleboard, ship));
    setBattleboard(emptyBattleboard);
  };

  const placeShip = (emptyBattleboard, ship) => {
    const startingX = generateStartingIndex();
    const startingY = generateStartingIndex();
    let occupied = false;

    // check if no ship in startingposition and inside board
    if (
      emptyBattleboard[startingY][startingX] === null &&
      10 > startingX + ship.length
    ) {
      // check if any of the ships parts is interfearing with another ship
      for (let i = startingX; i <= startingX + ship.length; i++) {
        // if you find ship anywhere, change occupied
        if (emptyBattleboard[startingY][i] !== null) {
          occupied = true;
        }
      }

      // if no ship-part found, place ship there
      if (!occupied) {
        const newBattleboard = [...emptyBattleboard];
        newBattleboard[startingY].fill(
          ship,
          startingX,
          startingX + ship.length
        );

        emptyBattleboard = [...newBattleboard]
        return emptyBattleboard
      }
    }
    // if any of the criterias fail, call function again to get new coordinates
    placeShip(ship);
  };

  return {
    battleboard,
    gameboard,
    placeAllShips,
  };
};

export default useGetShips;

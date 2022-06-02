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
    id: 1,
    name: "carrier",
    length: 4,
    // sunk: false,
  },
  {
    id: 2,
    name: "battleship",
    length: 3,
    // sunk: false,
  },
  {
    id: 3,
    name: "cruiser",
    length: 2,
    // sunk: false,
  },
  {
    id: 4,
    name: "destroyer",
    length: 2,
    // sunk: false,
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
        emptyBattleboard[startingY].fill(
          ship,
          startingX,
          startingX + ship.length
        );

        return 
      }
    }
    // if any of the criterias fail, call function again to get new coordinates
    placeShip(emptyBattleboard, ship);
  };

  const checkIfShipSunk = (clickedBox) => {
    const hitShip = battleboard[clickedBox]

    if (hitShip.length - 1 > 0) {
      console.log("Ship not sunk, but hit. Have another go")
      // hitShip.length - 1
    } else {
      ships.splice(hitShip.id, 1)
      console.log("Sunk ship is:", hitShip)
    }
  }

  return {
    battleboard,
    checkIfShipSunk,
    gameboard,
    placeAllShips,
  };
};

export default useGetShips;

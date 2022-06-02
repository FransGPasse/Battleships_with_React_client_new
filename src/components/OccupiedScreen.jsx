import React from 'react'
import { useNavigate } from 'react-router-dom'

const OccupiedScreen = () => {
    const navigate = useNavigate()

    const newGame = () => {
        navigate("/");
        console.log("start a new game??")
    }

    return (
        <div className="occupied-page">
            <h1 className="occupied-msg">There are already two players playing. You have to wait for your turn....</h1>
            <button 
                className="button occupied-btn"
                onClick={newGame}  
            >
            Try again?
            </button>
        </div>
    )
}

export default OccupiedScreen
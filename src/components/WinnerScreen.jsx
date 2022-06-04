import React from 'react'
import { useNavigate } from 'react-router-dom'

const WinnerScreen = () => {
    const navigate = useNavigate()
    const newGame = () => {
        // gå tillbaka till startsidan
        navigate("/")
    }

    return (
        <div>
            <h2>You won!!!🥳</h2>
            <button 
                className="play-again-button"
                onClick={newGame}    
            >
            Play again?
            </button>
        </div>
    )
}

export default WinnerScreen
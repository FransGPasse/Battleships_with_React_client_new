import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoserScreen = () => {
    const navigate = useNavigate()
    const newGame = () => {
        // gå tillbaka till startsidan
        navigate(`/`)
    }

    return (
        <div>
            <h2>You lost.....😥</h2>
            <button 
                className="play-again-button"
                onClick={newGame}  
            >
            Play again?
            </button>
        </div>
    )
}

export default LoserScreen
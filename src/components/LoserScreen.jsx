import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoserScreen = () => {
    const navigate = useNavigate()
    const newGame = () => {
        // gå tillbaka till startsidan
        navigate("/")
    }

    return (
        <div className='win-lose-container'>
            <h2 className='win-lose-title'>You lost.....😥</h2>
            <button 
                className="button play-again-btn"
                onClick={newGame}  
            >
            Play again?
            </button>
        </div>
    )
}

export default LoserScreen
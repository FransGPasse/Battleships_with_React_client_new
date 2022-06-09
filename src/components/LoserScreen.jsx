import React from "react";
import { useNavigate } from "react-router-dom";

const LoserScreen = () => {
  const navigate = useNavigate();
  const newGame = () => {
    // gå tillbaka till startsidan
    navigate("/");
  };

  return (
    <div className="end-page">
      <h1 className="end-page-title">You lost... 😓</h1>
      <button className="button play-again-btn" onClick={newGame}>
        Play again?
      </button>
    </div>
  );
};

export default LoserScreen;

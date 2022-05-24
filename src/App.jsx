import { Routes, Route } from "react-router-dom";
import "./assets/App.scss";

import JoinPage from "./pages/JoinPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/battleships" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;

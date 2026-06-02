import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <h1>🎮 Study Buddy</h1>
      <p>Gamify your focus</p>

      <button onClick={() => navigate("/themes")}>
        Start
      </button>
    </div>
  );
}
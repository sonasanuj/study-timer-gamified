import { useNavigate } from "react-router-dom";

export default function ThemeSelect() {
  const navigate = useNavigate();

  const selectTheme = (theme) => {
    localStorage.setItem("theme", theme);
    navigate("/dashboard");
  };

  return (
    <div className="themePage">
      <h1>🎨 Choose Theme</h1>
<div className="grid">

  <button
    className="pokemonBtn"
    onClick={() => selectTheme("Pokemon")}
    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
onMouseUp={(e) => e.currentTarget.style.transform = "scale(1.08)"}

  >
    ⚡ Pokemon
  </button>

  <button
    className="shinchanBtn"
    onClick={() => selectTheme("Shinchan")}
    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
onMouseUp={(e) => e.currentTarget.style.transform = "scale(1.08)"}
  >
    🔥 Shinchan
  </button>

  <button    className="doraemonBtn"
    onClick={() => selectTheme("Doraemon")}

  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
onMouseUp={(e) => e.currentTarget.style.transform = "scale(1.08)"} >
    🤖 Doraemon
  </button>

  <button
    className="oggyBtn"
    onClick={() => selectTheme("Oggy")}
    onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
onMouseUp={(e) => e.currentTarget.style.transform = "scale(1.08)"}
  >
    🪳 Oggy
  </button>

</div>
      
    </div>
  );
}
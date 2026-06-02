import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("Pokemon");
  const [popup, setPopup] = useState(true);

  const [studyMin, setStudyMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);

  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [pokemonStage, setPokemonStage] = useState("piplup");
  const [graph, setGraph] = useState([]);

  // Load selected theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Button click sound
  const clickSound = () => {
    new Audio(
      "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
    ).play();
  };

  // Timer
  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            finishSession();
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  // Session complete
  const finishSession = () => {
    const newXP = xp + 20;

    setXp(newXP);

    if (newXP % 100 === 0) {
  const newLevel = level + 1;

  setLevel(newLevel);

  if (newLevel >= 4) {
    setPokemonStage("piplup");
  }

  alert("⚡ Level Up!");
}
    setGraph((prev) => [
      ...prev,
      {
        session: prev.length + 1,
        time: studyMin
      }
    ]);

    setRunning(false);

    setTime(breakMin * 60);
  };

  // Time formatting
  const format = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };
  
  return (
    <div
  className={`dashboard ${
    pokemonStage === "piplup"
      ? "Piplup"
      : theme
  }`}
>
      {/* ONLY FOR POKEMON THEME */}
      {theme === "Pokemon" && (
  <img
    src={
      pokemonStage === "piplup"
        ? "/images/piplup.gif"
        : "/images/pikachu.gif"
    }
    alt="pokemon"
    className="pikachu"
  />
)}
      {/* POPUP */}
      {popup && (
        <>
          <div className="popupOverlay"></div>

          <div className="popup">

            <h2>Setup Session</h2>

            <input
              type="number"
              placeholder="Study minutes"
              value={studyMin}
              onChange={(e) =>
                setStudyMin(Number(e.target.value))
              }
            />

            <input
              type="number"
              placeholder="Break minutes"
              value={breakMin}
              onChange={(e) =>
                setBreakMin(Number(e.target.value))
              }
            />

            <button
              onClick={() => {
                clickSound();

                setTime(studyMin * 60);

                setPopup(false);

                setRunning(true);
              }}
            >
              Start
            </button>

          </div>
        </>
      )}

      {/* TOP BAR */}
      <div className="topBar">

        <button
          onClick={() => navigate("/themes")}
        >
          ⬅ Back
        </button>

        <h2>{theme} Mode</h2>
       
        <button
          onClick={() =>
            setTime(studyMin * 60)
          }
        >
          Reset
        </button>

      </div>

      {/* TIMER */}
      <div className="timerBox">

        <h1>{format(time)}</h1>

        <p>
          {running
            ? "🔥 Focus Mode"
            : "⏸ Paused"}
        </p>

      </div>

      {/* CONTROLS */}
      <div className="controls">

        <button
          onClick={() => {
            setRunning(true);
            clickSound();
          }}
        >
          Start
        </button>

        <button
          onClick={() => setRunning(false)}
        >
          Pause
        </button>

      </div>

      {/* MANUAL TIMER */}
      <div className="customTimer">

        <input
          type="number"
          placeholder="Study (min)"
          value={studyMin}
          onChange={(e) =>
            setStudyMin(Number(e.target.value))
          }
        />

        <input
          type="number"
          placeholder="Break (min)"
          value={breakMin}
          onChange={(e) =>
            setBreakMin(Number(e.target.value))
          }
        />

        <button
          onClick={() =>
            setTime(studyMin * 60)
          }
        >
          Set Timer
        </button>

      </div>

      {/* STATS */}
      <div className="stats">
  <p>⭐ XP: {xp}</p>
  <p>🏆 Level: {level}</p>
 
  <div className="xpContainer">
    <div
      className="xpFill"
      style={{ width: `${xp % 100}%` }}
    ></div>
  </div>

  <p>{xp % 100}/100 XP to next level</p>
</div>
      {/* GRAPH */}
      <LineChart
        width={320}
        height={200}
        data={graph}
      >
        <XAxis dataKey="session" />

        <YAxis />

        <Line
          type="monotone"
          dataKey="time"
          stroke="#ffd400"
        />
      </LineChart>

    </div>
  );
}
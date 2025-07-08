import React from "react";
import BackButton from "../BackButton/BackButton";
import Sidebar from "../Sidebar/Sidebar";
import "./BoardOfBoredom.css";

const board = Array.from({ length: 10 }, (_, i) => {
  const start = (9 - i) * 10;
  const row = Array.from({ length: 10 }, (_, j) => start + j + 1);
  return i % 2 !== 0 ? row : row.reverse();
});

const BoardOfBoredom = () => {
  const [position, setPosition] = React.useState(1);
  const [dice, setDice] = React.useState(null);

  const rollDice = () => {
    const val = Math.floor(Math.random() * 6) + 1;
    setDice(val);
    setPosition((prev) => (prev + val <= 100 ? prev + val : prev));
    setTimeout(() => setDice(null), 1000);
  };

  React.useEffect(() => {
    if (position === 100) {
      alert("🎉 You won!");
      setTimeout(() => {
        setPosition(1);
        setDice(null);
      }, 1000);
    }
  }, [position]);

  return (
    <section className="board__container">
      <Sidebar>
        <BackButton />
        <div className="board__panel board__panel--rules">
          <h2 className="board__panel-title">Rules</h2>
          <ul className="board__panel-list">
            <li className="board__panel-item">Zigzag tile numbering</li>
            <li className="board__panel-item">
              Alternating tile colors by row
            </li>
            <li className="board__panel-item">Rolls: random 1 - 6</li>
            <li className="board__panel-item">Land on 100 to win</li>
            <li className="board__panel-item">Overshoot? No move</li>
          </ul>
        </div>
        <div className="board__panel board__panel--hints">
          <h2 className="board__panel-title">Hints</h2>
          <ul className="board__panel-list">
            <li className="board__panel-item">
              <strong>Zigzag Numbering Logic:</strong> Even-indexed rows (from
              top) go right-to-left, odd-indexed rows go left-to-right. Use{" "}
              <code>Array.reverse()</code> smartly when mapping each row.
            </li>
            <li className="board__panel-item">
              <strong>Tile Highlighting:</strong> Highlight the current position
              with a centered dot or indicator. Position is a number between 1
              and 100 — compare it while rendering tiles.
            </li>
            <li className="board__panel-item">Tile size: 60×60</li>
            <li className="board__panel-item">
              <span className="board__color board__color--444" /> #444
            </li>
            <li className="board__panel-item">
              <span className="board__color board__color--d1e7dd" /> #d1e7dd
            </li>
            <li className="board__panel-item">
              <span className="board__color board__color--cfe2f3" /> #cfe2f3
            </li>
            <li className="board__panel-item">
              <span className="board__color board__color--fdfdfd" /> #fdfdfd
            </li>
            <li className="board__panel-item">
              <span className="board__color board__color--f5d0c5" /> #f5d0c5
            </li>
          </ul>
        </div>
      </Sidebar>

      <div className="board__main">
        <h1 className="board__title">Board of Boredom</h1>
        <div className="board__dice">
          <button onClick={rollDice} className="board__dice-button">
            🎲 {dice ? `Rolled: ${dice}` : "Roll Dice"}
          </button>
        </div>
        <div className="board__grid">
          {board.map((row, i) => (
            <div key={`row-${i}`} className="board__row">
              {row.map((el) => (
                <div
                  key={el}
                  className={`board__tile ${
                    el % 2 === 0 ? "board__tile--red" : ""
                  }`}
                >
                  <span className="board__tile-number">{el}</span>
                  {el === position && <div className="board__dot" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardOfBoredom;

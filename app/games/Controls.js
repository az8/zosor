import React from "react";

export default function TouchControls({ onUp, onDown, onLeft, onRight }) {
  return (
    <div className="touch-controls">
      <button className="control-btn up" onClick={onUp}>⬆️</button>
      <div className="middle-row">
        <button className="control-btn left" onClick={onLeft}>⬅️</button>
        <div className="spacer" />
        <button className="control-btn right" onClick={onRight}>➡️</button>
      </div>
      <button className="control-btn down" onClick={onDown}>⬇️</button>

      <style jsx>{`
        .touch-controls {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 10;
          border: 1px solid #cccccc;
          border-radius: 15px;
          padding: 5px;
        }
        .middle-row {
          display: flex;
          gap: 20px;
        }
        .control-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid white;
          border-radius: 12px;
          padding: 1px;
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        .control-btn:active {
          transform: scale(0.9);
        }
        .spacer {
          width: 6px;
        }
      `}</style>
    </div>
  );
}

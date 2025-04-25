"use client"
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import GameBoard from "./GameBoard";
import { Typography } from "@mui/material";

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    setHighestScore(window?.localStorage?.getItem("highestScore")
      ? window?.localStorage?.getItem("highestScore")
      : 0);
  }, []);

  const updateHighestScore = (score) => {
    if (score > highestScore) {
      setHighestScore(score);
      window?.localStorage?.setItem("highestScore", score);
    }
  };

  return (
    <Stack justifyContent="center" direction={"row"} sx={{ m: 8 }}>
      <Stack justifyContent="center" direction={"row"} sx={{ width: "500px", background: "#fafafa", borderRadius: "25px", border: "1px solid #f6f6f6" }}>
        <div style={{ width: "200px" }}>
          <Typography variant="overline" gutterBottom sx={{ display: 'block', fontSize: "20px", color: "#5e5a5a" }}>Block Game</Typography>
          <GameBoard
            updateHighestScore={updateHighestScore}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
          />
          <Typography variant="overline" gutterBottom sx={{ display: 'block', fontSize: "16px", color: "#5e5a5a" }}>Highest Score: {highestScore}</Typography>
        </div>
      </Stack>
    </Stack>
  );
}

export default GamePage;


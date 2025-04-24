"use client"
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import GameBoard from "./GameBoard";
import { Typography } from "@mui/material";

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [highestScore, setHighestScore] = useState(
    window?.localStorage?.getItem("highestScore") || 0
  );

  const updateHighestScore = (score) => {
    if (score > highestScore) {
      setHighestScore(score);
      window?.localStorage?.setItem("highestScore", score);
    }
  };

  return (
    <Stack justifyContent="center" direction={"row"} sx={{m: 8}}>
      <div>
      <Typography variant="overline" gutterBottom sx={{ display: 'block', fontSize: "20px" }}>Block Game</Typography>
      <GameBoard
        updateHighestScore={updateHighestScore}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
      />
      <Typography variant="overline" gutterBottom sx={{ display: 'block', fontSize: "16px" }}>Highest Score: {highestScore}</Typography>
      </div>
    </Stack>
  );
}

export default GamePage;


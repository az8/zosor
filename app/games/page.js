"use client"
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import GameBoard from "./GameBoard";

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [highestScore, setHighestScore] = useState(
    localStorage.getItem("highestScore") || 0
  );

  const updateHighestScore = (score) => {
    if (score > highestScore) {
      setHighestScore(score);
      localStorage.setItem("highestScore", score);
    }
  };

  return (
    <Stack justifyContent="center" direction={"row"} sx={{m: 8}}>
      <div>
      <h1>Block Game</h1>
      <GameBoard
        updateHighestScore={updateHighestScore}
        gameStarted={gameStarted}
        setGameStarted={setGameStarted}
      />
      <h2>Highest Score: {highestScore}</h2>
      </div>
    </Stack>
  );
}

export default GamePage;


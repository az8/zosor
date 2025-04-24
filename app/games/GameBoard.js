import React, { useState, useEffect, useRef } from "react";
import { Button, Typography } from "@mui/material";
import Controls from "./Controls";
import "./GameBoard.css";

const ROWS = 20;
const COLS = 10;
const EMPTY_CELL = 0;
const BLOCKS = [
    [[1, 1, 1, 1]], // I shape
    [[1, 1], [1, 1]], // O shape
    [[0, 1, 0], [1, 1, 1]], // T shape
    [[1, 1, 0], [0, 1, 1]], // Z shape
];

const generateBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY_CELL));

function GameBoard({ updateHighestScore, gameStarted, setGameStarted }) {
    const [board, setBoard] = useState(generateBoard);
    const [currentBlock, setCurrentBlock] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [paused, setPaused] = useState(false);
    const [score, setScore] = useState(0);

    const spacePressedRef = useRef(false);

    useEffect(() => {
        if (!gameStarted || gameOver || paused) return;
        const interval = setInterval(() => {
            moveDown();
        }, 500);

        return () => clearInterval(interval);
    }, [currentBlock, gameOver, paused, gameStarted]);

    useEffect(() => {

        const handleKeyDown = (event) => {
            if (event.key === " ") {
                event.preventDefault();
                if (!spacePressedRef.current && gameStarted) {
                    togglePause();
                    spacePressedRef.current = true;
                }
            }

            if (gameOver || paused) return;

            if (event.key === "ArrowLeft") moveBlock(-1);
            if (event.key === "ArrowRight") moveBlock(1);
            if (event.key === "ArrowDown") moveDown();
            if (event.key === "ArrowUp") rotateBlock();
        };

        const handleKeyUp = (event) => {
            if (event.key === " ") {
                spacePressedRef.current = false;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [currentBlock, gameOver, paused]);

    const togglePause = () => {
        console.log("togglePause called");
        setPaused((prev) => !prev);
    };

    useEffect(() => {
        if (gameStarted && !currentBlock && !gameOver) {
            spawnNewBlock();
        }
    }, [gameStarted, currentBlock, gameOver]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setPaused(false);
        setScore(0);
        setBoard(generateBoard());
    };

    const moveDown = () => {
        const newPosition = { ...currentBlock.position, y: currentBlock.position.y + 1 };

        if (!checkCollision(newPosition)) {
            setCurrentBlock((prev) => ({ ...prev, position: newPosition }));
        } else {
            placeBlock();
        }
    };

    const moveBlock = (direction) => {
        const newPosition = { ...currentBlock.position, x: currentBlock.position.x + direction };

        if (!checkCollision(newPosition)) {
            setCurrentBlock((prev) => ({ ...prev, position: newPosition }));
        }
    };

    const rotateBlock = () => {
        const rotated = currentBlock.shape[0].map((_, i) =>
            currentBlock.shape.map((row) => row[i]).reverse()
        );

        if (!checkCollision(currentBlock.position, rotated)) {
            setCurrentBlock((prev) => ({ ...prev, shape: rotated }));
        }
    };

    const checkCollision = (pos, shape = currentBlock.shape) => {
        return shape.some((row, rowIndex) =>
            row.some(
                (cell, colIndex) =>
                    cell &&
                    (pos.y + rowIndex >= ROWS ||
                        pos.x + colIndex < 0 ||
                        pos.x + colIndex >= COLS ||
                        board[pos.y + rowIndex]?.[pos.x + colIndex])
            )
        );
    };

    const placeBlock = () => {
        const newBoard = board.map((row) => [...row]);

        currentBlock.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell) {
                    newBoard[currentBlock.position.y + rowIndex][currentBlock.position.x + colIndex] = 1;
                }
            });
        });

        clearRows(newBoard);
    };

    const clearRows = (newBoard) => {
        const filteredBoard = newBoard.filter((row) => row.some((cell) => !cell));
        const clearedRows = ROWS - filteredBoard.length;
        const newRows = Array.from({ length: clearedRows }, () => Array(COLS).fill(EMPTY_CELL));

        if (clearedRows > 0) {
            setScore((prev) => prev + clearedRows);
            updateHighestScore(score + clearedRows);
            setBoard([...newRows, ...filteredBoard]);
        } else {
            setBoard(newBoard);
        }

        spawnNewBlock();
    };

    const spawnNewBlock = () => {
        const newBlock = {
            shape: BLOCKS[Math.floor(Math.random() * BLOCKS.length)],
            position: { x: 4, y: 0 },
        };

        if (checkCollision(newBlock.position, newBlock.shape)) {
            setGameOver(true);
        } else {
            setCurrentBlock(newBlock);
        }
    };

    // Merge Board with Moving Block for Rendering
    const mergedBoard = board.map((row) => [...row]);

    if (currentBlock) {
        currentBlock.shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell && currentBlock.position.y + rowIndex < ROWS) {
                    mergedBoard[currentBlock.position.y + rowIndex][currentBlock.position.x + colIndex] = 1;
                }
            });
        });
    }

    return (
        <div>
            <div className="game-controls">
                <Button
                    variant="outlined"
                    onClick={!gameStarted || gameOver ? startGame : () => {
                        if (gameStarted) togglePause();
                    }}>
                    {!gameStarted || gameOver ? "Start Game" : paused ? "Resume" : "Pause"}
                </Button>
            </div>
            <div className="game-board">
                {mergedBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className={`cell ${cell ? "filled" : ""}`} />
                        ))}
                    </div>
                ))}
            </div>
            <Typography variant="overline" sx={{ display: "block", fontSize: "16px", mt: 2 }}>Score: {score}</Typography>
            {gameOver && <Typography variant="overline" sx={{ fontSize: "16px", color: "#ab4444" }}>Game Over</Typography>}
            <Controls
                onUp={rotateBlock}
                onDown={moveDown}
                onLeft={() => moveBlock(-1)}
                onRight={() => moveBlock(1)}
            />
        </div>
    );
}

export default GameBoard;

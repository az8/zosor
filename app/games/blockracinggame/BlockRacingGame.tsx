import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Settings from "./Settings";
import { Settings as SettingsIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

/*
Game constants
*/

const GAME_WIDTH = 300;
const GAME_HEIGHT = 500;

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 60;

const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 60;

const PLAYER_SPEED = 4;

/*
Types
*/

type Obstacle = {
  id: number;
  x: number;
  y: number;
};

type SpeedConfig = {
  speed: number;
  spawnRate: number;
  scoreRate: number;
};

/*
Speed levels
*/

const SPEED_LEVELS: SpeedConfig[] = [
  { speed: 2, spawnRate: 1800, scoreRate: 200 },
  { speed: 3, spawnRate: 1400, scoreRate: 150 },
  { speed: 4, spawnRate: 1100, scoreRate: 120 },
  { speed: 5, spawnRate: 800, scoreRate: 100 },
  { speed: 7, spawnRate: 600, scoreRate: 80 },
];

const BlockRacingGame: React.FC = () => {

  /*
  State
  */

  const [playerX, setPlayerX] = useState<number>(
    GAME_WIDTH / 2 - PLAYER_WIDTH / 2
  );

  const [obstacles, setObstacles] = useState<Obstacle[]>([]);

  const [score, setScore] = useState<number>(0);

  const [gameOver, setGameOver] = useState<boolean>(false);

  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const [level, setLevel] = useState<number>(0);

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  /*
  Refs
  */

  const playerXRef = useRef<number>(playerX);

  const obstaclesRef = useRef<Obstacle[]>([]);

  const obstacleIdRef = useRef<number>(0);

  const keysRef = useRef({
    left: false,
    right: false,
  });

  const speedRef = useRef<SpeedConfig>(SPEED_LEVELS[0]);

  const animationRef = useRef<number | null>(null);

  const lastSpawnRef = useRef<number>(0);

  const lastScoreRef = useRef<number>(0);

  /*
  Sync refs
  */

  useEffect(() => {
    playerXRef.current = playerX;
  }, [playerX]);

  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    speedRef.current = SPEED_LEVELS[level];
  }, [level]);

  /*
  Keyboard input
  */

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "ArrowLeft") keysRef.current.left = true;

      if (e.key === "ArrowRight") keysRef.current.right = true;

    };

    const handleKeyUp = (e: KeyboardEvent) => {

      if (e.key === "ArrowLeft") keysRef.current.left = false;

      if (e.key === "ArrowRight") keysRef.current.right = false;

    };

    window.addEventListener("keydown", handleKeyDown);

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };

  }, []);

  /*
  Game Loop using requestAnimationFrame
  */

  useEffect(() => {

    if (!gameStarted || gameOver) return;

    let lastTime = performance.now();

    const loop = (time: number) => {

      const delta = time - lastTime;
      lastTime = time;

      /*
      Move player smoothly
      */

      let newPlayerX = playerXRef.current;

      if (keysRef.current.left)
        newPlayerX -= PLAYER_SPEED;

      if (keysRef.current.right)
        newPlayerX += PLAYER_SPEED;

      newPlayerX = Math.max(
        0,
        Math.min(GAME_WIDTH - PLAYER_WIDTH, newPlayerX)
      );

      playerXRef.current = newPlayerX;
      setPlayerX(newPlayerX);

      /*
      Spawn obstacles
      */

      if (time - lastSpawnRef.current > speedRef.current.spawnRate) {

        lastSpawnRef.current = time;

        obstaclesRef.current.push({
          id: obstacleIdRef.current++,
          x: Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH),
          y: -OBSTACLE_HEIGHT,
        });
      }

      /*
      Move obstacles
      */

      const speed = speedRef.current.speed;

      const newObstacles: Obstacle[] = [];

      for (const ob of obstaclesRef.current) {

        const newY = ob.y + speed;

        /*
        Collision detection
        */

        const playerTop = GAME_HEIGHT - PLAYER_HEIGHT;
        const playerLeft = playerXRef.current;
        const playerRight = playerLeft + PLAYER_WIDTH;

        const obBottom = newY + OBSTACLE_HEIGHT;
        const obLeft = ob.x;
        const obRight = ob.x + OBSTACLE_WIDTH;

        const collision =
          obBottom > playerTop &&
          obRight > playerLeft &&
          obLeft < playerRight;

        if (collision) {
          setGameOver(true);
          return;
        }

        if (newY < GAME_HEIGHT + 50) {
          newObstacles.push({ ...ob, y: newY });
        }
      }

      obstaclesRef.current = newObstacles;
      setObstacles(newObstacles);

      /*
      Score update
      */

      if (time - lastScoreRef.current > speedRef.current.scoreRate) {
        lastScoreRef.current = time;
        setScore(prev => prev + 1);
      }

      animationRef.current = requestAnimationFrame(loop);

    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };

  }, [gameStarted, gameOver, level]);

  /*
  Start / Restart
  */

  const startGame = () => {

    obstaclesRef.current = [];
    setObstacles([]);

    setScore(0);

    setGameOver(false);

    setGameStarted(true);

    const startX = GAME_WIDTH / 2 - PLAYER_WIDTH / 2;

    setPlayerX(startX);
    playerXRef.current = startX;

    lastSpawnRef.current = performance.now();
    lastScoreRef.current = performance.now();

  };

  const handleSettingsOpen = () => {
    setSettingsOpen(open => !open);
  };

  /*
  Render
  */

  return (
    <>

      <Stack justifyContent="center" direction={"row"} sx={{ my: 8, width: "100%" }}>
        <Stack justifyContent="center" direction={"row"} sx={{ width: "500px", background: "#fafafa", borderRadius: "25px", border: "1px solid #f6f6f6" }}>
          <div style={{ width: GAME_WIDTH, paddingTop: "20px" }}>
            <Stack justifyContent="space-between" direction={"row"} sx={{ width: "100%", background: "#fafafa", borderRadius: "25px", border: "1px solid #f6f6f6" }}>

              <Typography variant="overline" gutterBottom sx={{ display: 'block', fontSize: "20px", color: "#5e5a5a" }}>Block Racing</Typography>
              <div style={{paddingTop: "4px"}}>
              <IconButton
                color="inherit"
                aria-label="Open Settings"
                onClick={() => startGame()}
                edge="start"
                sx={{height: "40px"}}
              >
                <PlayArrowIcon />
              </IconButton>
              </div>
               <div style={{paddingTop: "4px"}}>
              <IconButton
                color="inherit"
                aria-label="Open Settings"
                onClick={() => handleSettingsOpen()}
                edge="start"
              >
                <SettingsIcon />
              </IconButton>
              </div>
            </Stack>
            <div style={{ textAlign: "center", fontFamily: "Arial" }}>

              {/* <div>Score: {score}</div> */}

              <div
                style={{
                  position: "relative",
                  width: GAME_WIDTH,
                  height: GAME_HEIGHT,
                  margin: "20px auto",
                  background: "#e6e6e6",
                  overflow: "hidden",
                  border: "3px solid white",
                }}
              >

                {gameStarted && !gameOver && (
                  <div
                    style={{
                      position: "absolute",
                      width: PLAYER_WIDTH,
                      height: PLAYER_HEIGHT,
                      background: "#84d5b5",
                      bottom: 0,
                      left: playerX,
                    }}
                  />
                )}

                {obstacles.map(ob => (
                  <div
                    key={ob.id}
                    style={{
                      position: "absolute",
                      width: OBSTACLE_WIDTH,
                      height: OBSTACLE_HEIGHT,
                      background: "#d44b4b",
                      top: ob.y,
                      left: ob.x,
                    }}
                  />
                ))}

                {gameOver && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.7)",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 28,
                      fontWeight: "bold",
                    }}
                  >
                    GAME OVER
                  </div>
                )}

              </div>

            </div>
            <div style={{ marginBottom: "20px" }}>Score: {score}</div>

          </div>

        </Stack>

      </Stack>
      <Settings
        open={settingsOpen}
        level={level}
        handleSpeedChange={(e: any) => setLevel(Number(e.target.value))}
        handleClose={() => handleSettingsOpen()}
      />
    </>
  );
};

export default BlockRacingGame;
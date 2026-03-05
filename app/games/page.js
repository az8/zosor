"use client";
import React, { useEffect, useRef, useState } from "react";
import BrickGame from "./brickgame/BrickGame";
import BlockRacingGame from "./blockracinggame/BlockRacingGame";
import Pagination from "@mui/material/Pagination";

const TOTAL_PAGES = 2;

const containerStyle = {
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

function GamePage() {
  // 0-based internally
  const [currentPage, setCurrentPage] = useState(0);

  const isScrolling = useRef(false);
  const touchStartY = useRef(null);

  // Centralized page setter (used by scroll + pagination)
  const goToPage = (newPage) => {
    if (isScrolling.current) return;
    if (newPage < 0 || newPage >= TOTAL_PAGES) return;

    isScrolling.current = true;
    setCurrentPage(newPage);

    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  };

  const changeByDirection = (direction) => {
    goToPage(currentPage + direction);
  };

  // Mouse wheel
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        changeByDirection(1);
      } else if (e.deltaY < 0) {
        changeByDirection(-1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPage]);

  // Touch support
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;

      const deltaY =
        touchStartY.current - e.changedTouches[0].clientY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          changeByDirection(1);
        } else {
          changeByDirection(-1);
        }
      }

      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPage]);

  // MUI Pagination (1-based)
  const handlePageChange = (event, value) => {
    goToPage(value - 1); // convert to 0-based
  };

  return (
    <div style={containerStyle}>
      {/* Mounted page */}
      {currentPage === 0 && <BrickGame />}
      {currentPage === 1 && <BlockRacingGame />}

      {/* Pagination */}
      <Pagination
        count={TOTAL_PAGES}
        page={currentPage + 1} // convert to 1-based
        onChange={handlePageChange}
        size="small"
        showFirstButton
        showLastButton
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      />
    </div>
  );
}

export default GamePage;
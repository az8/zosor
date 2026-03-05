import React, { useRef, useState, useEffect } from "react";
import Button from '@mui/material/Button';

export const controlsStyles = { color: "#FFF", borderRadius: "50%", height: "45px", minWidth: "45px", border: "0.1px solid transparent" };


export default function TouchControls({ onUp, onDown, onLeft, onRight, onCenter, centerState }) {
    const controlRef = useRef(null);
    const [position, setPosition] = useState({
        x: window.innerWidth - 200, // adjusted based on control width
        y: window.innerHeight - 200, // adjusted based on control height
    });
    const offset = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    useEffect(() => {
        const handleMove = (x, y) => {
            setPosition({
                x: x - offset.current.x,
                y: y - offset.current.y,
            });
        };

        const handleMouseMove = (e) => {
            if (isDragging.current) handleMove(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            if (!isDragging.current || e.touches.length !== 1) return;
            e.preventDefault(); // prevents scrolling
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        const stopDragging = () => {
            isDragging.current = false;
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", stopDragging);
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", stopDragging);
        document.addEventListener("touchcancel", stopDragging);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", stopDragging);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", stopDragging);
            document.removeEventListener("touchcancel", stopDragging);
        };
    }, []);

    const startDragMouse = (e) => {
        isDragging.current = true;
        const rect = controlRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const startDragTouch = (e) => {
        if (e.touches.length !== 1) return;
        isDragging.current = true;
        const touch = e.touches[0];
        const rect = controlRef.current.getBoundingClientRect();
        offset.current = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        };
    };

    return (
        <div
            ref={controlRef}
            onMouseDown={startDragMouse}
            onTouchStart={startDragTouch}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                touchAction: "none",
                cursor: "grab",
                zIndex: 1000,
                userSelect: "none",
                background: "rgba(0,0,0,0.2)",
                padding: "10px",
                borderRadius: "10px",
            }}
        >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined" onClick={onUp} style={controlsStyles}>{"⬆"}</Button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button variant="outlined" onClick={onLeft} style={controlsStyles}>{"⬅"}</Button>
                <Button variant="outlined" onClick={onCenter} style={{ ...controlsStyles, margin: "10px" }}>{centerState ? "▶" : "||"}</Button>
                <Button variant="outlined" onClick={onRight} style={{ ...controlsStyles, transform: "scaleX(-1)" }}>{"⬅"}</Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined" onClick={onDown} style={controlsStyles}>{"⬇"}</Button>
            </div>
        </div>
    );
}


import React from "react";
import "./Controls.css";
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function TouchControls({ onUp, onDown, onLeft, onRight }) {
    return (
        <div className="touch-controls">
            <IconButton aria-label="upControl" onClick={onUp}>
                <ArrowCircleUpIcon sx={{ color: "#aba7a7", fontSize: "50px", }} />
            </IconButton>
            <div className="middle-row">
                <IconButton aria-label="upControl" onClick={onLeft}>
                    <ArrowCircleLeftIcon sx={{ color: "#b4b2b2", fontSize: "50px", }} />
                </IconButton>
                <div className="spacer" />
                <IconButton aria-label="upControl" onClick={onRight}>
                    <ArrowCircleRightIcon sx={{ color: "#b4b2b2", fontSize: "50px", }} />
                </IconButton>
            </div>
            <IconButton aria-label="upControl" onClick={onDown}>
                <ArrowCircleDownIcon sx={{ color: "#aba7a7", fontSize: "50px", }} />
            </IconButton>
        </div>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton, Stack } from "@mui/material";
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import PointingCat from "../../lib/components/common/showingCat";

const Connect = () => {
  const email = "hi@zosor.com";
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Connect | Zosor";
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      // reset tooltip after 2 sec
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <Stack sx={{ pb: 4 }}>
      <Grid container sx={{ width: "100%", m: 0, p: 0, py: 4 }}>
        <Grid item sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
          <PointingCat direction="left" outlineColor="#37474f" variant={4} pointerDirection="down" />
        </Grid>
        <Grid
          item
          sx={{
            margin: 1,
            mb: 1,
            width: "100%",
            height: "260px",
            p: 8,
            background: "#f0f2ff",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PointingCat direction="left" outlineColor="#37474f"  variant={2} />
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>

            <Typography sx={{ fontSize: "18px", pt: 2, pb: 1 }}>
              Email us at
            </Typography>

              <a
                style={{ fontSize: "28px", color: "#414242", paddingBottom: "4px" }}
                href={`mailto:${email}`}
              >
                {email}
              </a>

              <Tooltip
                title={copied ? "Copied!" : "Copy email"}
                arrow
                placement="top"
              >
                <IconButton
                  onClick={handleCopy}
                  sx={{ mt: 2,}}
                >
                  <ContentCopyIcon sx={{ fontSize: "24px", color: "#414242" }} />
                </IconButton>
              </Tooltip>
          </Stack>
          <PointingCat direction="right" outlineColor="#37474f" variant={2} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Connect;
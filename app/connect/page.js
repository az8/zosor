"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton, Stack } from "@mui/material";
import { MailOutline as MailOutlineIcon, ContentCopy as ContentCopyIcon } from '@mui/icons-material';

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
        <Grid
          item
          sx={{
            margin: 1,
            mb: 1,
            width: "100%",
            height: "260px",
            p: 8,
            background: "#f5f5f5",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <MailOutlineIcon sx={{ fontSize: "48px" }} />

            <Typography sx={{ fontSize: "18px", pt: 2, pb: 2 }}>
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
                  <ContentCopyIcon sx={{ fontSize: "24px" }} />
                </IconButton>
              </Tooltip>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Connect;
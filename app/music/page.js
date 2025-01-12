"use client";
import { Box, Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import {
  postMusicSubmission,
} from "../../lib/redux/slices/sharedSlice";

const Music = (props) => {

  const reduxDispatch = useDispatch();


  const [musicForSubmission, setMusicForSubmission] = useState("");


  useEffect(() => {
    document.title = "Music | Zosor"
  }, []);


  const handleMusicSubmission = () => {

    if(musicForSubmission?.trim()) {

      reduxDispatch(postMusicSubmission({song: musicForSubmission})).then(res => {
        if (res["type"].includes("fulfilled")) {
          if (res && res.payload) {
            console.log('Video feed data fetched');
          }
        } else if (res["type"].includes("rejected")) {
          console.log('Fetching Video feed data failed');
        }
      });

    }
    
  };




  return <Box sx={{ pb: 2 }}>
    <Stack
      direction="row"
      justifyContent={"center"}
      sx={{ mt: 8, pt: 3 }}
    >
      <AudiotrackIcon sx={{ color: "#6e8efa", fontSize: "50px" }} />
      <AudiotrackIcon sx={{ color: "#6e8efa", fontSize: "50px" }} />
    </Stack>

    <Stack direction="row" justifyContent={"center"}
      sx={{ p: "40px", background: "", m: "10%", my: 4, borderRadius: "5px" }}>
      <TextField
        id="music-for-submission"
        label="Enter link of your online music"
        value={musicForSubmission}
        onChange={(event) => {
          setMusicForSubmission(event.target.value);
        }}
        sx={{ width: "100%", background: "#FFFFFF", }}
        autoComplete="off"
      />
    </Stack>

    <Stack direction="row" justifyContent={"center"}
      >
      <Button variant="contained"
        sx={{ background: "#6685f2", color: "#F7F7F7", borderRadius: "40px", height: "60px", width: "120px" }}
        onClick={handleMusicSubmission}
        >Submit</Button>
    </Stack>
  </Box>
};

export default Music;

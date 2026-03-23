"use client"
import { Box, Grid, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/redux/hooks';
import {
  getMusicFeedData,
} from "../../lib/redux/slices/sharedSlice";

const Music = (props) => {

  const reduxDispatch = useAppDispatch();

  const musicFeedData = useSelector((state) => state.shared.musicFeedData);

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [allPaginationPageCount, setAllPaginationPageCount] = useState(1);
  const [musicFeedPageData, setMusicFeedPageData] = useState([]);

  useEffect(() => {
    console.log("musicFeedData", musicFeedData);
    setCurrentPaginationPage(1);
    setAllPaginationPageCount(
      musicFeedData
        && Array.isArray(musicFeedData)
        && musicFeedData?.length > 0
        ? Math.ceil(musicFeedData?.length / 10)
        : 1
    );
    setMusicFeedPageData(
      musicFeedData
        && Array.isArray(musicFeedData)
        && musicFeedData?.length > 0
        ? musicFeedData?.slice(0, 10)
        : []
    );
  }, [musicFeedData]);

  useEffect(() => {
    document.title = "Music | Zosor"

    reduxDispatch(getMusicFeedData()).then(res => {
      if (res["type"].includes("fulfilled")) {
        if (res && res.payload) {
          console.log('Music feed data fetched');
        }
      } else if (res["type"].includes("rejected")) {
        console.log('Fetching Music feed data failed');
      }
    });
  }, []);


  const handlePaginationChange = (event, value) => {
    setCurrentPaginationPage(value);
    setMusicFeedPageData(
      musicFeedData
        && Array.isArray(musicFeedData)
        && musicFeedData?.length > 0
        ? musicFeedData?.slice((value - 1) * 10, value * 10)
        : []
    );
  };

  function getEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    const videoId = parsed.searchParams.get("v");

    if (!videoId) return "";

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return "";
  }
}

  return <Stack sx={{ pb: 4 }}>
    <Grid container sx={{ width: "100%", m: 0, p: 0, py: 4 }}>
      {
        musicFeedPageData?.map((music) => (
          <Grid item
            sx={{
              margin: 1,
              mb: 1,
              width: "100%",
              height: "220px",
              p: 0,
              background: "#f5f5f5",
              borderRadius: "5px",
              display: "flex",
              // justifyContent: "center"
            }}
            key={`musicFeedItem${music?.id}`}
          >
            <div>
            <Typography style={{ margin: "10px" }}>Black Lives Matter</Typography>
            <iframe
              width="320"
              height="160"
              // src="https://www.youtube.com/embed/uFzbO3tb3pk?si=hmEVnOglzekJ2Bm9"
              // src="https://www.youtube.com/embed/uFzbO3tb3pk"
              src={getEmbedUrl(music?.url)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                overflow: "hidden",
                borderRadius: "5px",
                margin: "10px"
              }}
              ></iframe>
              </div>
            {/* <iframe
              src={getEmbedUrl(music?.url)}
              width="350"
              height="550"
              style={{
                overflow: "hidden",
                borderRadius: "5px",
              }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen={true}
            ></iframe> */}
          </Grid>
        ))
      }
    </Grid>
    {allPaginationPageCount > 1 &&
      <Pagination
        count={allPaginationPageCount}
        showFirstButton
        showLastButton
        sx={{ mx: 7 }}
        page={currentPaginationPage}
        onChange={handlePaginationChange}
      />
    }
  </Stack>
};

export default Music;

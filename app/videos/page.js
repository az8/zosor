"use client"
import { Box, Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/redux/hooks';
import {
  getVideoFeedData,
} from "../../lib/redux/slices/sharedSlice";

const Videos = (props) => {

  const reduxDispatch = useAppDispatch();

  const videoFeedData = useSelector((state) => state.shared.videoFeedData);

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [allPaginationPageCount, setAllPaginationPageCount] = useState(1);
  const [videoFeedPageData, setVideoFeedPageData] = useState([]);

  useEffect(() => {
    setCurrentPaginationPage(1);
    setAllPaginationPageCount(
      videoFeedData
      && Array.isArray(videoFeedData)
      && videoFeedData?.length > 0
      ? Math.ceil(videoFeedData?.length / 10)
      : 1
    );
    setVideoFeedPageData(
      videoFeedData
      && Array.isArray(videoFeedData)
      && videoFeedData?.length > 0
      ? videoFeedData?.slice(0, 10)
      : []
      );
  }, [videoFeedData]);

  useEffect(() => {
    document.title = "Videos | Zosor"

    reduxDispatch(getVideoFeedData()).then(res => {
      if (res["type"].includes("fulfilled")) {
        if (res && res.payload) {
          console.log('Video feed data fetched');
        }
      } else if (res["type"].includes("rejected")) {
        console.log('Fetching Video feed data failed');
      }
    });
  }, []);


  const handlePaginationChange = (event, value) => {
    setCurrentPaginationPage(value);
    setVideoFeedPageData(
      videoFeedData
      && Array.isArray(videoFeedData)
      && videoFeedData?.length > 0
      ? videoFeedData?.slice((value - 1) * 10, value * 10)
      : []
      );
  };




  return <Stack sx={{pb: 4}}>
    <Grid container sx={{ width: "100%", m: 4, p: 0 }}>
      {
        videoFeedPageData?.map((video) => (
          <Grid item
            sx={{ margin: 3, mb: 1, width:"352px", height:"550px", p: 0, background: "#f5f5f5", borderRadius: "5px",}}
            key={`videoFeedItem${video?.id}`}
          >
            <iframe
              src={video?.url}
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
            ></iframe>
          </Grid>
        ))
      }
    </Grid>
    <Pagination
      count={allPaginationPageCount}
      showFirstButton
      showLastButton
      sx={{mx: 7}}
      page={currentPaginationPage}
      onChange={handlePaginationChange}
    />
  </Stack>
};

export default Videos;

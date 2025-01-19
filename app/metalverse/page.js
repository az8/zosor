"use client";
import { Box, Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from '../../lib/redux/hooks';
import {
  getMetalverseFeedData,
} from "../../lib/redux/slices/sharedSlice";
import MetalverseProfileCard from "./MetalverseProfileCard";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const Metalverse = (props) => {

  const reduxDispatch = useAppDispatch();

  const metalverseFeedData = useAppSelector((state) => state.shared.metalverseFeedData);

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [allPaginationPageCount, setAllPaginationPageCount] = useState(1);
  const [metalverseFeedPageData, setMetalverseFeedPageData] = useState([]);

  useEffect(() => {
    setCurrentPaginationPage(1);
    setAllPaginationPageCount(
      metalverseFeedData
        && Array.isArray(metalverseFeedData)
        && metalverseFeedData?.length > 0
        ? Math.ceil(metalverseFeedData?.length / 10)
        : 1
    );
    setMetalverseFeedPageData(
      metalverseFeedData
        && Array.isArray(metalverseFeedData)
        && metalverseFeedData?.length > 0
        ? metalverseFeedData?.slice(0, 10)
        : []
    );
  }, [metalverseFeedData]);

  useEffect(() => {
    document.title = "Metalverse | Zosor"

    reduxDispatch(getMetalverseFeedData()).then(res => {
      if (res["type"].includes("fulfilled")) {
        if (res && res.payload) {
          console.log('Metalverse feed data fetched');
        }
      } else if (res["type"].includes("rejected")) {
        console.log('Fetching Metalverse feed data failed');
      }
    });
  }, []);


  const handlePaginationChange = (event, value) => {
    setCurrentPaginationPage(value);
    setMetalverseFeedPageData(
      metalverseFeedData
        && Array.isArray(metalverseFeedData)
        && metalverseFeedData?.length > 0
        ? metalverseFeedData?.slice((value - 1) * 10, value * 10)
        : []
    );
  };




  return <Stack justifyContent="center">
    
    {metalverseFeedPageData?.map((metalItem, index) => (
      <Box key={`metalverseItem${index}`} sx={{mb: 8}}>
        <MetalverseProfileCard profileData={metalItem} />
        {index < metalverseFeedPageData?.length - 1 &&
        <Stack
          direction="row"
          justifyContent={"center"}
          sx={{ mt: 2, pt: 1 }}
        >
          <HorizontalRuleIcon sx={{mt: 4, color: "#a7bbff", fontSize: "30px"}} />
          </Stack>
        }
      </Box>
    ))}
    <Pagination
      count={allPaginationPageCount}
      showFirstButton
      showLastButton
      sx={{ mx: 7, mt: 4 }}
      page={currentPaginationPage}
      onChange={handlePaginationChange}
    />
  </Stack >
};

export default Metalverse;

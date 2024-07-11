import { Box, Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatingFeedData,
} from "../../redux/slices/sharedSlice";
import DatingProfileCard from "./DatingProfileCard";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const Dating = (props) => {

  const reduxDispatch = useDispatch();

  const datingFeedData = useSelector((state) => state.shared.datingFeedData);

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [allPaginationPageCount, setAllPaginationPageCount] = useState(1);
  const [datingFeedPageData, setDatingFeedPageData] = useState([]);

  useEffect(() => {
    setCurrentPaginationPage(1);
    setAllPaginationPageCount(
      datingFeedData
        && Array.isArray(datingFeedData)
        && datingFeedData?.length > 0
        ? Math.ceil(datingFeedData?.length / 10)
        : 1
    );
    setDatingFeedPageData(
      datingFeedData
        && Array.isArray(datingFeedData)
        && datingFeedData?.length > 0
        ? datingFeedData?.slice(0, 10)
        : []
    );
  }, [datingFeedData]);

  useEffect(() => {
    document.title = "Dating | Zosor"

    reduxDispatch(getDatingFeedData()).then(res => {
      if (res["type"].includes("fulfilled")) {
        if (res && res.payload) {
          console.log('Dating feed data fetched');
        }
      } else if (res["type"].includes("rejected")) {
        console.log('Fetching Dating feed data failed');
      }
    });
  }, []);


  const handlePaginationChange = (event, value) => {
    setCurrentPaginationPage(value);
    setDatingFeedPageData(
      datingFeedData
        && Array.isArray(datingFeedData)
        && datingFeedData?.length > 0
        ? datingFeedData?.slice((value - 1) * 10, value * 10)
        : []
    );
  };




  return <Stack justifyContent="center">
    
    {datingFeedPageData?.map((datingItem, index) => (
      <Box key={`datingItem${index}`} sx={{mb: 8}}>
        <DatingProfileCard profileData={datingItem} />
        {index < datingFeedPageData?.length - 1 &&
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

export default Dating;

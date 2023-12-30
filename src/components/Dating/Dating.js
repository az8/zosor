import { Box, Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatingFeedData,
} from "../../redux/slices/sharedSlice";
import DatingProfileCard from "./DatingProfileCard";

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




  return <Stack justifyContent="center" sx={{
    // background: "#614385", /* fallback for old browsers */
    // background: "-webkit-linear-gradient(to right, #614385, #516395)", /* Chrome 10-25, Safari 5.1-6 */
    // background: "linear-gradient(to right, #614385, #516395)",
    // pb: 4,
  }}>
    
    {datingFeedPageData?.map((datingItem, index) => (
      <React.Fragment key={`datingItem${index}`}>
        <DatingProfileCard profileData={datingItem} />
      </React.Fragment>
    ))}
    <Pagination
      count={allPaginationPageCount}
      showFirstButton
      showLastButton
      sx={{ mx: 7,
        // "& .MuiPaginationItem-root": {
        //   color: "#FFFFFF"
        // },
        mt: 4,
      }}
      page={currentPaginationPage}
      onChange={handlePaginationChange}
    />
  </Stack >
};

export default Dating;

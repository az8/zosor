import { Box, Checkbox, TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import avatarImage from '../assets/background/background.jpg';
import Picture404 from "./Picture404"



const Page404 = (props) => {



  useEffect(() => {

    document.title = "404 | Zosor"

  }, []);



  return <Box>
    <Stack
      direction="row"
      justifyContent={"center"}
      sx={{ mt: 2, pt: 3 }}
    >
      <Picture404 />
    </Stack>



      <Stack
        direction="column"
        justifyContent={"center"}
        sx={{ mt: 4, p: 2, marginX: "20%", background: "#F4F4F4", borderRadius: "15px" }}
      >
        <Typography sx={{ color: "#543f99", textAlign: "center" }} >NOT FOUND</Typography>
      </Stack>


  </Box>
};

export default Page404;

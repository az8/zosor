"use client";
import { Box, Checkbox, TextField, Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";

import ProfilePicture from "../../lib/components/ProfilePicture/ProfilePicture";
import ProfileSection from "./ProfileSection";
import { multiline } from "./ProfileConstants";



const Profile = (props) => {

  const [profileData, setProfileData] = useState({});


  useEffect(() => {

    document.title = "Profile | Zosor";

    setProfileData({
      status: "John is yet to write here",
      about: "John is yet to write here",
      location: "John is yet to write here",
      contactDetails: "John is yet to write here",
      gender: "John is yet to write here",
      height: "John is yet to write here",
      waistSize: "John is yet to write here",
    })

  }, []);



  const handleInputChange = (event) => {
    event.stopPropagation();
    event.preventDefault();

    let newProfileData = {};

    if (event.target.name.toLowerCase().includes("status")) {
      newProfileData = { ...profileData, status: event.target.value }
    }

    if (event.target.name.toLowerCase().includes("about")) {
      newProfileData = { ...profileData, about: event.target.value }
    }

    if (event.target.name.toLowerCase().includes("location")) {
      newProfileData = { ...profileData, location: event.target.value }
    }

    if (event.target.name.toLowerCase().includes("contactdetails")) {
      newProfileData = { ...profileData, contactDetails: event.target.value }
    }

    if (event.target.name.toLowerCase().includes("height")) {
      newProfileData = { ...profileData, height: event.target.value }
    }

    if (event.target.name.toLowerCase().includes("gender")) {
      newProfileData = { ...profileData, gender: event.target.value }
    }
    if (event.target.name.toLowerCase().includes(`waistsize`)) {
      newProfileData = { ...profileData, waistSize: event.target.value }
    }

    setProfileData(newProfileData);

  }



  return <Box sx={{ pb: 2 }}>
    <Stack
      direction="row"
      justifyContent={"center"}
      sx={{ mt: 2, pt: 3 }}
    >
      <ProfilePicture image={"/cutecoala.jpg"} />
    </Stack>

    <Stack
      direction="row"
      justifyContent={"center"}
      sx={{ mt: 2, pt: 1 }}
    >
      <Typography sx={{ color: "#494949", mt: 0.5, fontSize: "20px" }}>John</Typography>
    </Stack>

    {
      Object.entries(profileData).map(([key, value]) =>
      (<React.Fragment key={`profile${key}`}>
        <ProfileSection
          title={key}
          handleChange={handleInputChange}
          value={value}
          multiline={multiline[key]}
        />
      </React.Fragment>
      )
      )
    }

  </Box>
};

export default Profile;

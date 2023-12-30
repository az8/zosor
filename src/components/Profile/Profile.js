import { Box, Checkbox, TextField, Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import avatarImage from '../assets/cutecoala.jpg';
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { ProfileStyles } from "./ProfileStyles";



const Profile = (props) => {

  const reduxDispatch = useDispatch();

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

    // console.log("event", event, event.target.name, event.target.value)

    let newProfileData = {};

      if (event.target.name.includes("Status")) {
        newProfileData = { ...profileData, status: event.target.value }
      }

      if (event.target.name.includes("About")) {
        newProfileData = { ...profileData, about: event.target.value }
      }

      if (event.target.name.includes("Location")) {
        newProfileData = { ...profileData, location: event.target.value }
      }

      if (event.target.name.includes("ContactDetails")) {
        newProfileData = { ...profileData, contactDetails: event.target.value }
      }

      if (event.target.name.includes("Height")) {
        newProfileData = { ...profileData, height: event.target.value }
      }

      if (event.target.name.includes("Gender")) {
        newProfileData = { ...profileData, gender: event.target.value }
      }
      if (event.target.name.includes(`WaistSize`)) {
        newProfileData = { ...profileData, waistSize: event.target.value }
      }

      setProfileData(newProfileData);

  }



  return <Box sx={{ pb:2 }}>
    <Stack
      direction="row"
      justifyContent={"center"}
      sx={{ mt: 2, pt: 3 }}
    >
      <ProfilePicture image={avatarImage} />
    </Stack>

    <Stack
      direction="row"
      justifyContent={"center"}
      sx={{ mt: 2, pt: 1 }}
    >
      <Typography sx={{ color: "#494949", mt: 0.5, fontSize: "20px" }}>John</Typography>
    </Stack>


      <Stack direction="column" justifyContent={"flex-start"} sx={ProfileStyles.profileSectionStyles}>
        <Typography sx={ProfileStyles.legendBox} >STATUS</Typography>
        <TextField
          id="status"
          // label=""
          variant="filled"
          sx={ProfileStyles.profileInputStyles}
          multiline
          rows={4}
          value={profileData?.status}
          onChange={handleInputChange}
          name={`profileStatus`}
          autocomplete="off"
        />
      </Stack>


      {/* <Stack
        direction="column"
        justifyContent={"flex-start"}
        sx={{ mt: 4, p: 2, marginX: "20%",borderRadius: "15px",
          background: "#EEEEEE",
          border: "0.5px solid #C2C2C2",
          boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.01), 0px 1px 3px 0px rgba(0,0,0,0.14), 0px 1px 1px 1px rgba(0,0,0,0.01)",
        }}
      >
        <Typography sx={{ color: "#543f99" }} >ABOUT</Typography>
        <Typography sx={{ color: "#494949", mt: 0.5 }} >Amit is yet to write here</Typography>
      </Stack> */}


      <Stack direction="column" sx={ProfileStyles.profileSectionStyles}>
        <Typography sx={ProfileStyles.legendBox} >ABOUT</Typography>
        <TextField
          id="about"
          // label=""
          variant="filled"
          sx={ProfileStyles.profileInputStyles}
          multiline
          rows={4}
          value={profileData?.about}
          onChange={(event) => handleInputChange(event)}
          name={`profileAbout`}
          autocomplete="off"
        />
      </Stack>



      <Stack sx={ProfileStyles.profileSectionStyles}>
        <Typography sx={ProfileStyles.legendBox} >LOCATION</Typography>
        <TextField
          id="location"
          // label=""
          variant="filled"
          sx={ProfileStyles.profileInputStyles}
          value={profileData?.location}
          onChange={(event) => handleInputChange(event)}
          name={`profileLocation`}
          autocomplete="off"
        />
      </Stack>



      <Stack sx={ProfileStyles.profileSectionStyles}>
        <Typography sx={ProfileStyles.legendBox} >CONTACT DETAILS</Typography>
        <TextField
          id="contactDetails"
          // label=""
          variant="filled"
          sx={ProfileStyles.profileInputStyles}
          multiline
          rows={4}
          value={profileData?.contactDetails}
          onChange={(event) => handleInputChange(event)}
          name={`profileContactDetails`}
          autocomplete="off"
        />
      </Stack>



      <Stack sx={ProfileStyles.profileSectionStyles}>
        <Typography sx={ProfileStyles.legendBox} >HEIGHT</Typography>
        <TextField
          id="height"
          // label=""
          variant="filled"
          sx={ProfileStyles.profileInputStyles}
          value={profileData?.height}
          onChange={(event) => handleInputChange(event)}
          name={`profileHeight`}
          autocomplete="off"
        />
      </Stack>



      <Stack sx={ProfileStyles.profileSectionStyles}>
        <Typography sx={ProfileStyles.legendBox} >GENDER</Typography>
        <TextField
          id="gender"
          // label=""
          variant="filled"
          sx={ProfileStyles.profileInputStyles}
          value={profileData?.gender}
          onChange={(event) => handleInputChange(event)}
          name={`profileGender`}
          autocomplete="off"
        />
      </Stack>




      <Stack sx={ProfileStyles.profileSectionStyles}>
        <Typography sx={ProfileStyles.legendBox} >WAIST SIZE</Typography>
        <TextField
          id="waistSize"
          // label=""
          variant="filled"
          value={profileData?.waistSize}
          sx={ProfileStyles.profileInputStyles}
          onChange={(event) => handleInputChange(event)}
          name={`profileWaistSize`}
          autocomplete="off"
        />
      </Stack>




  </Box>
};

export default Profile;

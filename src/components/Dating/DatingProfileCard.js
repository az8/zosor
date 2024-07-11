import { Box, Card, CardActionArea, CardHeader, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeightIcon from '@mui/icons-material/Height';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NumbersIcon from '@mui/icons-material/Numbers';
import NotesIcon from '@mui/icons-material/Notes';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';

import { postDatingWave } from "../../redux/slices/sharedSlice";


import { useNavigate } from "react-router-dom";
import avatarImage from '../assets/cutecoala.jpg';
import ProfilePicture from "../ProfilePicture/ProfilePicture";


const DatingProfileCard = ({
  profileData = {},
  loading = false,
}) => {

  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const [wavedProfilesStorage, setWavedProfilesStorage] = useState([]);

  useEffect(() => {
    setWavedProfilesStorage(JSON.parse(window.localStorage.getItem('wavedProfiles')) || [])
  }, []);

  const handleWave = (profileId) => {

    // console.log("profileId", profileId);

    // Get recent waves from local storage
    let wavedProfiles = JSON.parse(window.localStorage.getItem('wavedProfiles')) || [];

    // Start constructing object for updating recent waved profiles to local storage
    if (wavedProfiles && Array.isArray(wavedProfiles)) {
      wavedProfiles = [
        profileId,
        ...wavedProfiles.filter((profileObject, index) => { return profileObject?.profileId != profileId }),
      ]
    }
    // End constructing object for updating recent waved profiles to local storage

    // Update recent waved profiles to local storage
    window.localStorage.setItem('wavedProfiles', JSON.stringify(wavedProfiles));
    setWavedProfilesStorage(wavedProfiles);

    reduxDispatch(postDatingWave({profileId: profileId})).then(res => {
      if (res["type"].includes("fulfilled")) {
        if (res && res.payload) {
          console.log('Waved Successfully');
        }
      } else if (res["type"].includes("rejected")) {
        console.log('Waving failed');
      }
    });
  }


  return (<Stack
    direction="row"
    justifyContent={"center"}
    sx={{ mt: 2, pt: 1 }}
  >
    <Card
      sx={{
        // background: "#eeeeee",
        // background: "#eeeeff",
        // background: "#F6F6F6",
        background: "#fafafa",
        background: "#fcfcfc",
        background: "#f3f6ff",
        background: "#fffaf3",
        color: "#35353e",
        minWidth: "320px",
        width: "500px",
        // border: "1.5px solid #f5f5f5",
        // border: "1.5px solid #FFFFFF",
        // border: "1.5px solid #E7E7FF",
        // boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.01), 0px 1px 10px 0px rgba(0,0,0,0.14), 0px 1px 5px 1px rgba(0,0,0,0.01)",
        boxShadow: "none",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        border: "1px solid #f1f0f0",
        border: "0.1px solid #dade0c",
        border: "0.1px solid #d9d9d9",
        border: "0.1px solid #e8e7e7",
        border: "1px solid #eeeaea",
      }}
    >
      <CardHeader title={profileData && profileData?.name ? profileData?.name : "Name"}
        sx={{
        background: "#a7bbff",
        background: "#afb4e6",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
       }}
      />

      <CardContent>

        <Stack
          direction="row"
          justifyContent={"center"}
          sx={{ mt: 2, pt: 3 }}
        >
          <ProfilePicture image={avatarImage} />
        </Stack>

        {profileData && profileData?.age &&
          <Stack
            direction="row"
            sx={{ mt: 6 }}
          > <NumbersIcon sx={{ color: "#d8c2c2", mr: 1 }} />
            <Typography sx={{ fontSize: "18px", color: "#474747" }}>{`${profileData?.age} years`}</Typography>
          </Stack>
        }

        {profileData && profileData?.gender &&
          <Stack
            direction="row"
            sx={{ mt: 2 }}
          > <PermIdentityIcon sx={{ color: "#d8c2c2", mr: 1 }} />
            <Typography sx={{ fontSize: "18px", color: "#474747" }}> {profileData?.gender} </Typography>
          </Stack>
        }

        {profileData && profileData?.height &&
          <Stack
            direction="row"
            sx={{ mt: 2 }}
          > <HeightIcon sx={{ color: "#d8c2c2", mr: 1 }} />
            <Typography sx={{ fontSize: "18px", color: "#474747" }}>
              {`${Math.floor((profileData?.height)/12)} ft ${profileData?.height % 12} inchs`}
              </Typography>
          </Stack>
        }

        {profileData && profileData?.location &&
          <Stack
            direction="row"
            sx={{ mt: 2 }}
          > <LocationOnIcon sx={{ color: "#d8c2c2", mr: 1 }} />
            <Typography sx={{ fontSize: "17px", color: "#474747" }}> {profileData?.location} </Typography>
          </Stack>
        }

        {profileData && profileData?.waist &&
          <Stack
            direction="row"
            sx={{ mt: 2 }}
          ><HeightIcon sx={{ color: "#d8c2c2", mr: 1, transform: "rotate(270deg)" }} />
            <Typography sx={{ fontSize: "17px", color: "#474747" }}> {`${profileData?.waist} inchs`} </Typography>
          </Stack>
        }

        {profileData && profileData?.about &&
          <Stack
            direction="row"
            sx={{ mt: 2 }}
          ><NotesIcon sx={{ color: "#d8c2c2", mr: 1 }} />
            <Typography sx={{ fontSize: "17px", color: "#474747" }}> {profileData?.about} </Typography>
          </Stack>
        }

        <Stack
          direction="row"
          justifyContent={"center"}
          sx={{ mt: 2, pt: 3, }}
        >
          {wavedProfilesStorage
            && Array.isArray(wavedProfilesStorage)
            && wavedProfilesStorage?.includes(profileData?.profileId)
            ?
            <IconButton disabled sx={{ border: "1px solid #acbaea" }}>
              <HourglassFullIcon
                sx={{ color: "#6685f2", fontSize: "50px", }}
              />
            </IconButton>

            :
            <IconButton aria-label="delete"
              onClick={() => handleWave(profileData?.profileId)}
              sx={{ border: "1px solid #acbaea" }}
            >
              <WavingHandIcon
                sx={{ color: "#6685f2", fontSize: "50px", }}

              />
            </IconButton>
          }

        </Stack>

        <Stack
          direction="row"
          justifyContent={"center"}
          sx={{ mt: 1 }}
        >
          <Typography sx={{ fontSize: "14px", color: "#474747" }}>
            {wavedProfilesStorage
              && Array.isArray(wavedProfilesStorage)
              && wavedProfilesStorage?.includes(profileData?.profileId)
              ? `Waved ${profileData && profileData?.name ? profileData?.name: ""}`
              : `Wave ${profileData && profileData?.name ? profileData?.name: ""}`
            }
          </Typography>
        </Stack>

      </CardContent>
    </Card>
  </Stack>
  );
}

export default DatingProfileCard;
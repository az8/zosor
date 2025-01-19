import { Box, Card, CardActionArea, CardHeader, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WavingHandIcon from '@mui/icons-material/WavingHand';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeightIcon from '@mui/icons-material/Height';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NumbersIcon from '@mui/icons-material/Numbers';
import NotesIcon from '@mui/icons-material/Notes';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import { postMetalverseWave } from "../../lib/redux/slices/sharedSlice";
import ProfilePicture from "../../lib/components/ProfilePicture/ProfilePicture";


const MetalverseProfileCard = ({
  profileData = {},
  loading = false,
}) => {

  const reduxDispatch = useDispatch();

  const [wavedProfilesStorage, setWavedProfilesStorage] = useState([]);

  useEffect(() => {
    setWavedProfilesStorage(JSON.parse(window.localStorage.getItem('wavedProfiles')) || [])
  }, []);

  const handleWave = (profileId) => {

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

    reduxDispatch(postMetalverseWave({ profileId: profileId })).then(res => {
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
        // background: "#fffaf3",
        color: "#35353e",
        minWidth: "320px",
        width: "500px",
        boxShadow: "none",
        borderRadius: "5px",
        border: "1.45px solid #eeeaea",
      }}
    >
      <CardHeader title={profileData && profileData?.name ? profileData?.name : "Name"}
        sx={{
          background: "#bfd8ff",
        }}
      />

      <CardContent sx={{ py: 0 }}>

        <Stack
          direction="row"
          justifyContent={"center"}
          sx={{ mt: 0, pb: 3, background: "#f9f9f9", mx: "-16px" }}
        >
          <ProfilePicture image={"/cutecoala.jpg"} />
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
              {`${Math.floor((profileData?.height) / 12)} ft ${profileData?.height % 12} inchs`}
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
          sx={{ background: "#f5f5f5", margin: "-16px", mt: 2, mb: "-24px" }}
        >

          <Stack
            direction="row"
            justifyContent={"center"}
            sx={{ pt: 2 }}
          >
            {wavedProfilesStorage
              && Array.isArray(wavedProfilesStorage)
              && wavedProfilesStorage?.includes(profileData?.profileId)
              ?
              <IconButton disabled>
                <HourglassFullIcon
                  sx={{ color: "#6685f2", fontSize: "50px", }}
                />
              </IconButton>

              :
              <IconButton aria-label="delete" onClick={() => handleWave(profileData?.profileId)}>
                <WavingHandIcon
                  sx={{ color: "#6685f2", fontSize: "50px", }}
                />
              </IconButton>
            }

          </Stack>

          <Stack
            direction="row"
            justifyContent={"center"}
            sx={{ my: 1 }}
          >
            <Typography sx={{ fontSize: "14px", color: "#474747" }}>
              {wavedProfilesStorage
                && Array.isArray(wavedProfilesStorage)
                && wavedProfilesStorage?.includes(profileData?.profileId)
                ? `Waved ${profileData && profileData?.name ? profileData?.name : ""}`
                : `Wave ${profileData && profileData?.name ? profileData?.name : ""}`
              }
            </Typography>
          </Stack>
        </Stack>

      </CardContent>
    </Card>
  </Stack>
  );
}

export default MetalverseProfileCard;
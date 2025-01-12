import { Box } from "@mui/material";
import Image from 'next/image'

function ProfilePicture({ image }) {

  return <Box sx={{
    borderRadius: "5px",
    border: "2px solid #f1f1f1",
    width: "200px",
    height: "200px",
    // alignContent: "center",
    // justifyContent: "center",
    // backgroundImage: `url(${image})`,
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    '&:hover': {
      backgroundImage: `linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ), url(${image})`,
    }
  }}>
    <Image
      src={image}
      alt="Description of the image"
      width={500} height={300}
    />

  </Box>

}

export default ProfilePicture
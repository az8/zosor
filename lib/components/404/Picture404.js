import { Box } from "@mui/material";
// import bgImg from "../assets/cutecoala.jpg"
import bgImg from "../../../public/cutecoala.jpg"


function Picture404({image = bgImg}) {
  
    return <Box sx={{
      borderRadius: "15px",
      border: "2px solid #F7F7F7",
      width: "200px",
      height: "200px",
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      '&:hover': {
        backgroundImage: `linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ), url(${image})`,
      }
    }}/>

}

export default Picture404
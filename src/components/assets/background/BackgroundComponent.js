import React from 'react'
//@ts-ignore
import bgImg from "./background.jpg"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    width: "105%",
    height: "calc(105vh )",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    // backgroundImage: `linear-gradient( rgba(0,0,0,.5), rgba(0,0,0,.5) ), url(${bgImg})`,
    // background: `linear-gradient( rgba(34,50,62,0.7), rgba(0,0,0,0.5) )`,
    // background: `#F8F8F8`,
    // background: '#e5e3f0',
    background: '#f0edff',

    // background: `#dcd9ec`,
    // background: `#F7F7F7`,
    // background: `#FFFFFF`,

    // background: "#f9f9fa",

    background: "#faf9fd",
    background: "#fafafa",
    background: "#faf7f7",
    background: "#fffbfb",

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // filter: "blur(5.07317px)",
    left: "-1rem",
    top: 0,
    filter: "blur(14px)",
    zIndex: -300,
  },
}))
function BG() {
    const classes = useStyles()
    return <div className={classes.background}/>
}

export default BG
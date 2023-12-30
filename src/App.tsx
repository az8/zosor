
import { Box,
  CssBaseline,
  Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { History } from "history";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import BackgroundComponent from "./components/assets/background/BackgroundComponent";
import { ThemeName, useThemeSelection } from "./shared-theme";
import Stack from "@mui/material/Stack";
import AppBar from "./components/AppBar/AppBar"
import Picture404 from "./components/404/Page404";
import Videos from "./components/Videos/Videos";
import Music from "./components/Music/Music";
import Dating from "./components/Dating/Dating";
import './App.css';

    interface AppProps {
      history: History;
    }
    
     const App: React.FC<AppProps> = () => {
      const dispatch = useDispatch();

      const { theme, themeActions } = useThemeSelection("b", "light");
      const { changeTheme, toggleColorMode } = themeActions;

      const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeTheme(e.target.value as ThemeName);
      };

      return (
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
          <BackgroundComponent />
          <AppBar></AppBar>
          <Stack>
            {
              <Box
              sx={{
                minHeight: `calc(100vh - 138px)`, overflow: "scroll",
                pb: 4
              }}
            >
              {/* <BrowserRouter> */}
                <Routes>
                  {/* <Route path="/feed/:feed" element={<div>Hi</div>} /> */}
                  <Route path="/" element={<Videos/>} />
                  <Route path="/videos" element={<Videos/>} />
                  <Route path="/dating" element={<Dating/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/music" element={<Music/>} />
                  <Route path="/*" element={<Picture404/>} />
                </Routes>

              {/* </BrowserRouter> */}
              </Box>
            }
            <Box sx={{  padding: "25px", px: 1, zIndex: 1, background: "#6b658c", width: "100%" }} >
              <Stack
                direction="row"
                justifyContent={"end"}
              >
                <div>
                  <Typography variant="body2" mr={2} sx={{ color: "#FFFFFF" }}>
                    Copyrights @ Zosor
                  </Typography>
                </div>
              </Stack>
            </Box>
          </Stack>
          </ThemeProvider>
        </>
      );
    };
    export default App;

        
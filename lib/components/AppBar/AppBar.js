import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const pages = ['videos', 'metalverse', 'profile', 'music'];

function ResponsiveAppBar() {
  const pathname = usePathname();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      background: "#4b437d",
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CampaignIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {`ZOSOR`}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            ><Stack>
              {pages.map((page) => (
                <Link key={page} href={`/${page}`}
                style={{
                  borderLeft: pathname && pathname.split("/")[1] === page ? "4px solid #cbcbd4" : "none",
              }}
              onClick={() => {handleCloseNavMenu()}}
                >
                  {page?.toUpperCase()}
                </Link>
              ))}
              </Stack>
            </Menu>
          </Box>
          <CampaignIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ZOSOR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${page}`}
                style={{ my: 2, display: 'block', borderRadius: "5px", padding: "10px",
                color: "#FFFFFF",
                borderBottom: pathname && (pathname.split("/")[1] === page) ? "0.5px solid #e0dfff" : "red",
                background: pathname && pathname.split("/")[1] === page ? "#3d2f6d" : "",
              }}
              >
                {page?.toUpperCase()}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            ><Stack>
              {pages.map((page) => (
                <Link
                  key={`avatarMenu${page}`}
                  href={`${page}`}
                  style={{borderLeft: pathname && pathname.split("/")[1] === page ? "4px solid #cbcbd4" : "none"}}
                  onClick={handleCloseUserMenu}
                  >
                  {page?.toUpperCase()}
                </Link>
              ))}
              </Stack>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
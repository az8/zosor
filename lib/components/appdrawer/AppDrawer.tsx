import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const pages = [
  { name: 'music', icon: <MusicNoteIcon /> },
  { name: 'games', icon: <SportsEsportsIcon /> },
];


// Define an interface for the props
interface DrawerProps {
  open: boolean;
  drawerWidth: number;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));


export default function AppDrawer({ open, drawerWidth }: DrawerProps) {

  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography variant="h6" noWrap component="div">
          Zosor
        </Typography>
      </DrawerHeader>
      <List sx={{ paddingY: "0px" }}>
        {
          pages.map(page => (
            <Link
              key={`${page.name}Draweritem`}
              href={`/${page.name}`}
            >
              <ListItem disablePadding sx={{
                borderRadius: "5px",
                background: pathname && pathname.split("/")[1] === page.name ? "#e5e5e5" : "",
              }}>
                <ListItemButton>
                  <ListItemIcon>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText primary={page.name.charAt(0).toUpperCase() + page.name.slice(1)} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        }

      </List>
    </Drawer>
  );
}

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


// Define the shape of the function
type HandleChangeFunction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

// Define an interface for the props
interface AppSwitchShortcutProp {
    open: boolean;
    handleDrawerOpen: HandleChangeFunction;
}

function AppDrawerToggle({ open, handleDrawerOpen }: AppSwitchShortcutProp) {

    return (
        <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  position: "fixed",
                  top: '10px',
                  left: '16px',
                  zIndex: 1201
                },
              ]}
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
    );
}

export default AppDrawerToggle;
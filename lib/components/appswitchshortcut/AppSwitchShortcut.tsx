import IconButton from '@mui/material/IconButton';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';


// Define the shape of the function
type HandleChangeFunction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

// Define an interface for the props
interface AppSwitchShortcutProp {
    activeTab: string;
    handleSwitchApp: HandleChangeFunction;
}

function AppSwitchShortcut({ activeTab, handleSwitchApp }: AppSwitchShortcutProp) {

    return (
        <IconButton
            color="inherit"
            aria-label="Switch app"
            onClick={handleSwitchApp}
            edge="start"
            sx={[
                {
                    mr: 2,
                    position: "fixed",
                    top: '10px',
                    right: '10px',
                },
            ]}
        >
            {activeTab === "games" ? <MusicNoteIcon /> : <SportsEsportsIcon />}
        </IconButton>
    );
}

export default AppSwitchShortcut;
import { TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ProfileStyles } from "./ProfileStyles";

const ProfileSection = ({ title = "Profile Section", multiline = false, value, handleChange }) => {

  return <Stack sx={ProfileStyles.profileSectionStyles}>
    <Typography sx={ProfileStyles.legendBox} >{title.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}</Typography>
    <TextField
      id={title}
      variant="filled"
      sx={ProfileStyles.profileInputStyles}
      multiline={multiline}
      rows={multiline ? 4 : undefined}
      value={value}
      onChange={(event) => handleChange(event)}
      name={`profile${title}`}
      autoComplete="off"
    />
  </Stack>
};

export default ProfileSection;

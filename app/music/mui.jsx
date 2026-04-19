import {
  Box,
  Grid,
  Typography,
  IconButton,
  Rating,
  Slider,
  Stack,
} from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating, {
  // Filter out any prop starting with '$' so it doesn't reach the DOM
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})(({ theme, $fillColor, $hovercolor }) => ({
  '& .MuiRating-iconFilled': {
    color: $fillColor || '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: $hovercolor || '#ff3d47',
  },
}));

export const MUI = {
  // mui
  Box: Box,
  Grid: Grid,
  IconButton: IconButton,
  Rating: Rating,
  Slider: Slider,
  Stack: Stack,
  Typography: Typography,
  // Custom
  StyledRating: StyledRating
};
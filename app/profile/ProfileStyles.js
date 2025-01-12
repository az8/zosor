// import { makeStyles } from "@mui/styles";

// export const useStyles = makeStyles((theme) => ({
//   wrapper: (props) => ({
//     borderCollapse: "collapse",
//     flexWrap: "nowrap",
//   }),


//   inputRoot: {
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#ada4a4",
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#ada4a4",
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#ada4a4",
//     },
//   },
//   popupIndicator: {
//     color: "#fff",
//   },
//   clearIndicator: {
//     color: "#fff",
//   },

//   label: {
//     color: "#fff",
//   },


// }));

// export const inputStyles = makeStyles((theme) => ({
//   inputRoot: {
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#ada4a4",
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#ada4a4",
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#ada4a4",
//     },
//   },
//   popupIndicator: {
//     color: "#fff",
//   },
//   clearIndicator: {
//     color: "#fff",
//   },
// }));

// export const inputTranslucentStyles = makeStyles((theme) => ({
//   inputRoot: {
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(194, 178, 152, 0.25)",
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(194, 178, 152, 0.25)",
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(194, 178, 152, 0.25)",
//     },
//   },
//   popupIndicator: {
//     color: "#fff",
//   },
//   clearIndicator: {
//     color: "#fff",
//   },
// }));

// export const textFieldStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     '& label.Mui-focused': {
//       color: '#FFFFFF',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: '#ada4a4',
//       },
//       '&:hover fieldset': {
//         borderColor: '#ada4a4',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#ada4a4',
//       },
//     },
//   },
// }));

const pageHeaderStyles = {
  fontSize: "30px",
  fontWeight: "300",
  m: 0,
  p: 0,
  pl: 1,
  color: "#FFFFFF",
  background: "linear-gradient(180deg, rgba(97, 97, 97, 0.4) 99.99%, rgba(97, 97, 97, 0) 100%)",
  borderBottom: "0.5px solid #848080"
};




const autocompleteStyles = {
  width: "100%",
  "& input": { color: "#fff", },
  '& .MuiInputLabel-root.MuiInputLabel-formControl': { color: '#FFFFFF', },
}

const profileSectionStyles = {
  mt: 4, marginX: "20%", borderRadius: "5px",
  boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.01), 0px 1px 3px 0px rgba(0,0,0,0.14), 0px 1px 1px 1px rgba(0,0,0,0.01)",
}



const legendBox = {
  color: "#35353e",
  background: "#f6f3f3",
  p: 2,
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  fontSize: "20px"
};

const profileInputStyles = {
  color: "#494949",
  background: "#f6f6f6",
  border: "none",
  '& .MuiFilledInput-root': {
    backgroundColor: "#f6f6f6",
    backgroundColor: "#FFFFFF",
    paddingBottom: "15px",

  },
};

export const ProfileStyles = {
  // useStyles: useStyles,
  // inputStyles: inputStyles,
  // inputTranslucentStyles: inputTranslucentStyles,
  // textFieldStyles: textFieldStyles,
  pageHeaderStyles: pageHeaderStyles,
  autocompleteStyles: autocompleteStyles,
  profileSectionStyles: profileSectionStyles,
  legendBox: legendBox,
  profileInputStyles: profileInputStyles,
}

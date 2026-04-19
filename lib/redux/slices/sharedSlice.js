import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { environment } from "../enviornment";

// @ts-ignore



export function authHeader() {
  const token = localStorage.getItem("auth_token");
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}

// Initial state for the data slice
const initialState = {

  loadingMusicFeedData: "notLoading",
  musicFeedData: [],
  getMusicFeedDataError: "",

};

const getMusicFeedData = createAsyncThunk("get/getMusicFeedData", async ( _ , { rejectWithValue, getState }) => {
  try {
    // @ts-ignore
    const response = await axios.get(`${environment.musicFeed}`);
    return response.data
  } catch (err) {
    return rejectWithValue(err["response"]["data"]["detail"])
  }
})


// Create the data slice
const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setMusicFeedData : (state,detail) => {
      state.musicFeedData = detail.payload;
    },
  },
  extraReducers: function (builder) {
    builder

      // getMusicFeedData
      .addCase(getMusicFeedData.pending, (state, action) => {
        state.loadingMusicFeedData = "loading";
        state.getMusicFeedDataError = "";
      })
      .addCase(getMusicFeedData.fulfilled, (state, action) => {
        state.loadingMusicFeedData = "notLoading";
        state.musicFeedData = action.payload
          && Array.isArray(action.payload)
          && action.payload?.length > 0
          ? action.payload
          : musicFeedData;
      })
      .addCase(getMusicFeedData.rejected, (state, action) => {
        state.loadingMusicFeedData = "failed";
        // @ts-ignore
        state.getMusicFeedDataError = action?.payload;
      })

  }
});
export {
  getMusicFeedData,
}
export const {
  setMusicFeedData,
} = sharedSlice.actions;
export default sharedSlice.reducer;


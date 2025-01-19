import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { environment } from "../enviornment";
import { metalverseFeedData } from "./staticData"

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

  loadingVideoFeedData: "notLoading",
  videoFeedData: [],
  getVideoFeedDataError: "",

  loadingPostMusicSubmission: "notLoading",
  postMusicSubmissionError: "",

  loadingMetalverseFeedData: "notLoading",
  metalverseFeedData: metalverseFeedData,
  getMetalverseFeedDataError: "",

  loadingPostMetalverseWave: "notLoading",
  postMetalverseWaveError: "",

};



const getVideoFeedData = createAsyncThunk("get/getVideoFeedData", async ( _ , { rejectWithValue, getState }) => {
  try {
    // @ts-ignore
    const response = await axios.get(`${environment.videoFeed}`);
    return response.data
  } catch (err) {
    return rejectWithValue(err["response"]["data"]["detail"])
  }
})


const postMusicSubmission = createAsyncThunk("post/postMusicSubmission", async (payload, { rejectWithValue, getState }) => {
  try {
      const response = await axios.post(`${environment.baseUrl}${environment.musicSubmission}`, payload);
      return response.data
  } catch (err) {
      return rejectWithValue(err["response"]["data"]["detail"])
  }
})

const getMetalverseFeedData = createAsyncThunk("get/getMetalverseFeedData", async ( _ , { rejectWithValue, getState }) => {
  try {
    // @ts-ignore
    const response = await axios.get(`${environment.baseUrl}${environment.metalverseFeed}`);
    return response.data
  } catch (err) {
    return rejectWithValue(err["response"]["data"]["detail"])
  }
})


const postMetalverseWave = createAsyncThunk("post/postMetalverseWave", async (payload, { rejectWithValue, getState }) => {
  try {
      const response = await axios.post(`${environment.baseUrl}${environment.metalverseWave}`, payload);
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
    setVideoFeedData : (state,detail) => {
      state.videoFeedData = detail.payload;
    },
    setMetalverseFeedData : (state,detail) => {
      state.metalverseFeedData = detail.payload;
    },

  },
  extraReducers: function (builder) {
    builder

      // getMetalverseFeedData
      .addCase(getMetalverseFeedData.pending, (state, action) => {
        state.loadingMetalverseFeedData = "loading";
        state.getMetalverseFeedDataError = "";
      })
      .addCase(getMetalverseFeedData.fulfilled, (state, action) => {
        state.loadingMetalverseFeedData = "notLoading";
        state.metalverseFeedData = action.payload
          && Array.isArray(action.payload)
          && action.payload?.length > 0
          ? action.payload
          : metalverseFeedData;
      })
      .addCase(getMetalverseFeedData.rejected, (state, action) => {
        state.loadingMetalverseFeedData = "failed";
        // @ts-ignore
        state.getMetalverseFeedDataError = action?.payload;
      })


      // postMetalverseWave
      .addCase(postMetalverseWave.pending, (state, action) => {
        state.loadingPostMetalverseWave = "loading";
        state.postMetalverseWaveError = "";
      })
      .addCase(postMetalverseWave.fulfilled, (state, action) => {
        state.loadingPostMetalverseWave = "notLoading";
      })
      .addCase(postMetalverseWave.rejected, (state, action) => {
        state.loadingPostMetalverseWave = "failed";
        // @ts-ignore
        state.postMetalverseWaveError = action?.payload;
      })



      // getVideoFeedData
      .addCase(getVideoFeedData.pending, (state, action) => {
        state.loadingVideoFeedData = "loading";
        state.getVideoFeedDataError = "";
      })
      .addCase(getVideoFeedData.fulfilled, (state, action) => {
        state.loadingVideoFeedData = "notLoading";
        state.videoFeedData = action.payload
          && Array.isArray(action.payload)
          && action.payload?.length > 0
          ? action.payload
          : videoFeedData;
      })
      .addCase(getVideoFeedData.rejected, (state, action) => {
        state.loadingVideoFeedData = "failed";
        // @ts-ignore
        state.getVideoFeedDataError = action?.payload;
      })

      // postMusicSubmission
      .addCase(postMusicSubmission.pending, (state, action) => {
        state.loadingPostMusicSubmission = "loading";
        state.postMusicSubmissionError = "";
      })
      .addCase(postMusicSubmission.fulfilled, (state, action) => {
        state.loadingPostMusicSubmission = "notLoading";
      })
      .addCase(postMusicSubmission.rejected, (state, action) => {
        state.loadingPostMusicSubmission = "failed";
        // @ts-ignore
        state.postMusicSubmissionError = action?.payload;
      })


      

  }
});
export {
  getVideoFeedData,
  postMusicSubmission,
  getMetalverseFeedData,
  postMetalverseWave,
}
export const {
  setVideoFeedData,
  setMetalverseFeedData,
} = sharedSlice.actions;
export default sharedSlice.reducer;


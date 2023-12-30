import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { environment } from "../enviornment";
import { datingFeedData,
  videoFeedData } from "./staticData"

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
  videoFeedData: videoFeedData,
  getVideoFeedDataError: "",

  loadingPostMusicSubmission: "notLoading",
  postMusicSubmissionError: "",

  loadingDatingFeedData: "notLoading",
  datingFeedData: datingFeedData,
  getDatingFeedDataError: "",

  loadingPostDatingWave: "notLoading",
  postDatingWaveError: "",

};



const getVideoFeedData = createAsyncThunk("get/getVideoFeedData", async ( _ , { rejectWithValue, getState }) => {
  try {
    // @ts-ignore
    const response = await axios.get(`${environment.baseUrl}${environment.videoFeed}`);
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

const getDatingFeedData = createAsyncThunk("get/getDatingFeedData", async ( _ , { rejectWithValue, getState }) => {
  try {
    // @ts-ignore
    const response = await axios.get(`${environment.baseUrl}${environment.datingFeed}`);
    return response.data
  } catch (err) {
    return rejectWithValue(err["response"]["data"]["detail"])
  }
})


const postDatingWave = createAsyncThunk("post/postDatingWave", async (payload, { rejectWithValue, getState }) => {
  try {
      const response = await axios.post(`${environment.baseUrl}${environment.datingWave}`, payload);
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
    setDatingFeedData : (state,detail) => {
      state.datingFeedData = detail.payload;
    },

  },
  extraReducers: function (builder) {
    builder

      // getDatingFeedData
      .addCase(getDatingFeedData.pending, (state, action) => {
        state.loadingDatingFeedData = "loading";
        state.getDatingFeedDataError = "";
      })
      .addCase(getDatingFeedData.fulfilled, (state, action) => {
        state.loadingDatingFeedData = "notLoading";
        state.datingFeedData = action.payload
          && Array.isArray(action.payload)
          && action.payload?.length > 0
          ? action.payload
          : datingFeedData;
      })
      .addCase(getDatingFeedData.rejected, (state, action) => {
        state.loadingDatingFeedData = "failed";
        // @ts-ignore
        state.getDatingFeedDataError = action?.payload;
      })


      // postDatingWave
      .addCase(postDatingWave.pending, (state, action) => {
        state.loadingPostDatingWave = "loading";
        state.postDatingWaveError = "";
      })
      .addCase(postDatingWave.fulfilled, (state, action) => {
        state.loadingPostDatingWave = "notLoading";
      })
      .addCase(postDatingWave.rejected, (state, action) => {
        state.loadingPostDatingWave = "failed";
        // @ts-ignore
        state.postDatingWaveError = action?.payload;
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
  getDatingFeedData,
  postDatingWave,
}
export const {
  setVideoFeedData,
  setDatingFeedData,
} = sharedSlice.actions;
export default sharedSlice.reducer;


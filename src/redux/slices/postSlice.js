import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body) => {
    try {
    
      const response = await axiosClient.post("/user/getUserProfile", body);
      console.log("user profilesss", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } 
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body) => {
    try {
      
      const response = await axiosClient.post("/post/like", body);
      console.log("user like", response);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    } 
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        console.log("like",post);
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if  (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});

export default postsSlice.reducer;

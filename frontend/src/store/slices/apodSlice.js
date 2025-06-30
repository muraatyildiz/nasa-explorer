import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApodAndMood = createAsyncThunk(
  "apod/fetchApodAndMood",
  async (date = null) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : null;

    const apodRes = await axios.get("https://nasa-explorer-cmp4.onrender.com/api/nasa/apod", {
      params: formattedDate ? { date: formattedDate } : {},
    });

    const moodRes = await axios.post("https://nasa-explorer-cmp4.onrender.com/api/ai/mood", {
      imageUrl: apodRes.data.url,
      title: apodRes.data.title,
      explanation: apodRes.data.explanation,
    });
    return {
      apod: apodRes.data,
      mood: moodRes.data,
    };
  }
);

const apodSlice = createSlice({
  name: "apod",
  initialState: {
    apod: null,
    aiMood: {
      mood: "",
      style: "",
      colors: ["#000000", "#000000", "#000000"],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApodAndMood.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApodAndMood.fulfilled, (state, action) => {
        state.loading = false;
        state.apod = action.payload.apod;
        state.aiMood = action.payload.mood;
      })
      .addCase(fetchApodAndMood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apodSlice.reducer;

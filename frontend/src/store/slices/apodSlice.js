import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchApodAndAiAnalysis = createAsyncThunk(
  "apod/fetchApodAndAiAnalysis",
  async (date = null) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : null;

    const apodRes = await axios.get("https://nasa-explorer-cmp4.onrender.com/api/nasa/apod", {
      params: formattedDate ? { date: formattedDate } : {},
    });

    const aiAnalysisRes = await axios.post("https://nasa-explorer-cmp4.onrender.com/api/ai/analysis", {
      imageUrl: apodRes.data.url,
      title: apodRes.data.title,
      explanation: apodRes.data.explanation,
    });
    return {
      apod: apodRes.data,
      aiAnalysisRes: aiAnalysisRes.data,
    };
  }
);

const apodSlice = createSlice({
  name: "apod",
  initialState: {
    apod: null,
    aiAnalysis: {
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
      .addCase(fetchApodAndAiAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApodAndAiAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.apod = action.payload.apod;
        state.aiAnalysis = action.payload.aiAnalysisRes;
      })
      .addCase(fetchApodAndAiAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apodSlice.reducer;

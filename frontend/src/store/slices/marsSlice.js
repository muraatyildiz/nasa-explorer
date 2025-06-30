import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { format } from 'date-fns';

export const fetchMarsPhotos = createAsyncThunk(
  'mars/fetchPhotos',
  async (date) => {
    const formattedDate = format(new Date(date), 'yyyy-MM-dd');
    const res = await axios.get(`http://localhost:3001/api/nasa/mars-photos?date=${formattedDate}`);
    return { date: formattedDate, photos: res.data.photos };
  }
);

const marsSlice = createSlice({
  name: 'mars',
  initialState: {
    date: new Date().toISOString(), 
    photos: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.toISOString(); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarsPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarsPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload.photos;
        state.date = action.payload.date;
      })
      .addCase(fetchMarsPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setDate } = marsSlice.actions;
export default marsSlice.reducer;

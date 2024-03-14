// stationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosNoAuth} from '../../lib/AxiosBase'; // assuming you have Axios instance without authentication

// Define initial state
const initialState = {
  nearestStations: [],
  stationsByCity: [],
  status: 'idle',
  error: null,
};

// Define thunk for fetching nearest gas stations by geolocation
export const fetchNearestStations = createAsyncThunk(
  'station/fetchNearestStations',
  async (coordinates:any, { rejectWithValue }) => {
    try {
      const response = await axiosNoAuth.get(`/geolocation/nearest-gas-stations?lat=${coordinates.lat}&lng=${coordinates.lng}`);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define thunk for fetching gas stations by city
export const fetchStationsByCity = createAsyncThunk(
  'station/fetchStationsByCity',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axiosNoAuth.get(`/geolocation/gas-stations-by-city?city=${city}`);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create stationSlice
const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearestStations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNearestStations.fulfilled, (state, action:any) => {
        state.status = 'succeeded';
        state.nearestStations = action.payload;
      })
      .addCase(fetchNearestStations.rejected, (state, action:any) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchStationsByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStationsByCity.fulfilled, (state, action:any) => {
        state.status = 'succeeded';
        state.stationsByCity = action.payload;
      })
      .addCase(fetchStationsByCity.rejected, (state, action:any) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default stationSlice.reducer;

// stationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosNoAuth} from '../../lib/AxiosBase'; // assuming you have Axios instance without authentication
import { Station } from '../../types/Station';

interface StationState {
  nearestStations: Station[];
  stationsByCity: Station[];
  status: string;
  error: any; 
}

const initialState: StationState = {
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
  async (city: string, { rejectWithValue }) => {
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
      .addCase(fetchNearestStations.fulfilled, (state, action: { payload: Station[] }) => {
        state.status = 'succeeded';
        const uniqueStations = action.payload.filter((station, index, self) =>
          index === self.findIndex(s => s.id === station.id)
        );
        state.nearestStations = uniqueStations;
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

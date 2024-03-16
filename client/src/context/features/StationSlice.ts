import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosNoAuth } from '../../lib/AxiosBase';
import { Station } from '../../types/Station';

interface StationState {
  nearestStations: Station[];
  stationsByCity: Station[];
  status: string;
  isLoading: boolean; 
  error: any;
}

const initialState: StationState = {
  nearestStations: [],
  stationsByCity: [],
  status: 'idle',
  isLoading: false, // Initialize isLoading to false
  error: null,
};

export const fetchNearestStations = createAsyncThunk(
  'station/fetchNearestStations',
  async (coordinates: any, { rejectWithValue }) => {
    try {
      const response = await axiosNoAuth.get(`/geolocation/nearest-gas-stations?lat=${coordinates.latitude}&lng=${coordinates.longitude}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStationsByCity = createAsyncThunk(
  'station/fetchStationsByCity',
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axiosNoAuth.get(`/geolocation/gas-stations-by-city?city=${city}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearestStations.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchNearestStations.fulfilled, (state, action: { payload: Station[] }) => {
        state.status = 'succeeded';
        const uniqueStations = action.payload.filter((station, index, self) =>
          index === self.findIndex((s) => s.id === station.id)
        );
        state.nearestStations = uniqueStations;
        state.isLoading = false;
      })
      .addCase(fetchNearestStations.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchStationsByCity.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(fetchStationsByCity.fulfilled, (state, action: any) => {
        state.status = 'succeeded';
        state.stationsByCity = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchStationsByCity.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default stationSlice.reducer;

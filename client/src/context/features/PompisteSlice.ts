import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants'; // Assuming you have an axios instance configured

// Async thunk to fetch all pompistes
export const GetPompistes = createAsyncThunk('pompistes/fetchAll', async () => {
  try {
    const response = await axiosAuth.get('/pompistes');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to create a new pompiste
export const createPompiste = createAsyncThunk('pompistes/create', async (pompisteData) => {
  try {
    const response = await axiosAuth.post('/pompistes', pompisteData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to update a pompiste
export const updatePompiste = createAsyncThunk('pompistes/update', async (pompisteId: string, pompisteData: any) => {
    try {
      const response = await axiosAuth.put(`/pompistes/${pompisteId}`, pompisteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  

// Async thunk to delete a pompiste
export const deletePompiste = createAsyncThunk('pompistes/delete', async (pompisteId) => {
  try {
    await axiosAuth.delete(`/pompistes/${pompisteId}`);
    return pompisteId;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  pompistes: [],
  isLoading: false,
  error: null,
};

const pompistesSlice = createSlice({
  name: 'pompistes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
  },
});

export default pompistesSlice.reducer;

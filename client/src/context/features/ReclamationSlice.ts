import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants'; // Assuming you have an axios instance configured

// Async thunk to fetch reclamations
export const fetchReclamations = createAsyncThunk('reclamations/fetchAll', async () => {
  try {
    const response = await axiosAuth.get('/reclamations');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to create a new reclamation
export const createReclamation = createAsyncThunk('reclamations/create', async (reclamationData) => {
  try {
    const response = await axiosAuth.post('/reclamations', reclamationData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to update a reclamation
export const updateReclamation = createAsyncThunk('reclamations/update', async ({ reclamationId, reclamationData }: { reclamationId: string, reclamationData: any }) => {
  try {
    const response = await axiosAuth.put(`/reclamations/${reclamationId}`, reclamationData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to delete a reclamation
export const deleteReclamation = createAsyncThunk('reclamations/delete', async (reclamationId) => {
  try {
    await axiosAuth.delete(`/reclamations/${reclamationId}`);
    return reclamationId;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  reclamations: [],
  isLoading: false,
  error: null,
};

const reclamationsSlice = createSlice({
  name: 'reclamations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
  },
});

export default reclamationsSlice.reducer;

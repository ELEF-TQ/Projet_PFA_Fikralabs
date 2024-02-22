import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants'; // Assuming you have an axios instance configured

// Async thunk to fetch admin data
export const fetchAdminData = createAsyncThunk('admin/fetchData', async () => {
  try {
    const response = await axiosAuth.get('/admin/data');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to update admin data
export const updateAdminData = createAsyncThunk('admin/updateData', async (adminData) => {
  try {
    const response = await axiosAuth.put('/admin/data', adminData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  adminData: null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
  },
});

export default adminSlice.reducer;

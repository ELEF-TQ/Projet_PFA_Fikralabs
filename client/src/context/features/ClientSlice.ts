import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants'; 
import Swal from 'sweetalert2';

// Async thunk to fetch a single pompiste by matriculeRH
export const getClient = createAsyncThunk('clients/fetch', async (phone: string) => {
  try {
    const response = await axiosAuth.get(`/clients/${phone}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch pompiste'); 
  }
});
  


const initialState = {
  client:null,
  clients: [],
  isLoading: false,
  error: null,
};

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getClient.rejected, (state, action) => {
      state.isLoading = false;
      Swal.fire({icon: 'error',title: 'Code n\'est pas correct',text:'nigga'})
    })
    .addCase(getClient.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.client = action.payload;

      
    })
   

     
  },
});

export default clientSlice.reducer;

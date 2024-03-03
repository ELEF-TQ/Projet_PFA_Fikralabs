import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'; 
import { axiosAuth } from '../../lib/Constants'; 

// Async thunk to create a new review
export const createConversion = createAsyncThunk('convesions/create', async (pompisteId :string) => {
  try {
    const response = await axiosAuth.post(`/conversions/${pompisteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to create a new review
export const acceptConversion = createAsyncThunk('convesions/accept', async (id :any) => {
    try {
      const response = await axiosAuth.patch(`/conversions${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
});

// Async thunk to create a new review
export const acceptAllConversion = createAsyncThunk('convesions/acceptAll', async (ids :any) => {
    try {
      const response = await axiosAuth.post('/acceptAll', ids);
      return response.data;
    } catch (error) {
      throw error;
    }
});



const initialState = {
  conversions: [],
  isLoading: false,
  error: null,
};

const conversionsSlice = createSlice({
  name: 'conversions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConversion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createConversion.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'success',title: 'Conversion Created!',text: 'Your conversion has been successfully created.',})
      })
      .addCase(createConversion.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'error',title: 'Conversion Creation Failed',text: 'Failed to create the conversion. Please try again later.',});
      })
      .addCase(acceptConversion.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'success',title: 'Conversion Creation Failed',text: 'Failed to create the conversion. Please try again later.',
        });
      })
      .addCase(acceptAllConversion.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'success',title: 'Conversion Creation Failed',text: 'Failed to create the conversion. Please try again later.',
        });
      })
     
     
     
  },
});

export default conversionsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/AxiosBase';
import Swal from 'sweetalert2';

export const resetPassword = createAsyncThunk('resetPassword/reset', async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post('/reset-password', formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk('resetPassword/forgot', async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axiosAuth.post('/reset-password/email', formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
    result: null,
    isLoading: false,
    error: null,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
        state.error = null;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password reset successful!',
        }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";
            }
        });
      })
      .addCase(resetPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: action.payload.message,
        });
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
        state.error = null;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Un code de Verification est envoyé à votre boite mail!',
        });
      })
      .addCase(forgotPassword.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload.message;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: action.payload.message,
        });
      });
  },
});

export default resetPasswordSlice.reducer;

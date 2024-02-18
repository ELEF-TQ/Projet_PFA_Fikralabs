import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { axiosNoAuth } from '@/lib/Constants';

// Async thunk to handle login
export const handleLogin = createAsyncThunk('auth/login', async (formData :any) => {
    try {
      const response = await axiosNoAuth.post('/auth/login',formData);
      return response.data;
    } catch (error) {
      throw error;
    }
});

// Async thunk to handle signup
export const handleSignup = createAsyncThunk('auth/signup', async (formData:any) => {
  try {
    const response = await axiosNoAuth.post('/auth/signup',formData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: 'null' ,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        const router = useRouter();
        router.push('/auth/login'); 
      })
      .addCase(handleSignup.rejected, (state, action :any) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        const router = useRouter();
        if (action.payload.user.role === 'ADMIN') {
          router.push('/admin'); 
        } else {
          router.push(`/user/${action.payload.user.id}`); 
        }
      })
      .addCase(handleLogin.rejected, (state, action :any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;

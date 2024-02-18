import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// const session = await getServerSession(authOptions);

export const handleLogin = createAsyncThunk('auth/login', async (formData ) => {
    try {
      console.log(formData)
      return formData;
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  });

// Handle signup
export const handleSignup = createAsyncThunk('auth/signup', async (formData) => {
  try {
    console.log(formData)
    return formData;
  } catch (error) {
    console.error('Login failed', error);
    alert('Login failed. Please try again.');
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const router = useRouter();
        router.push('/auth/login'); 
      })
      .addCase(handleSignup.rejected, (state, action :any) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload.message;
      })
  },
});

export default authSlice.reducer;

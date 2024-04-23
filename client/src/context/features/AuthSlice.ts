import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosNoAuth, axiosNoAuthMultipart } from '../../lib/AxiosBase';
import Swal from 'sweetalert2';
import { storeUserSession } from '../../utils/Encryption';

// Async thunk to handle login
export const handleLogin = createAsyncThunk('auth/login', async (formData: any, thunkAPI) => {
  try {
    const response = await axiosNoAuth.post('/auth/login', formData);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to handle signup
export const handleSignup = createAsyncThunk('auth/signup', async (formData: any, thunkAPI) => {
  try {
    const response = await axiosNoAuthMultipart.post('/auth/signup', formData);
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
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
      })
      .addCase(handleSignup.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire('Success!', 'Votre inscription a été soumise avec succès.', 'success').then(() => {
          window.location.href = '/login';
        });
      })
      .addCase(handleSignup.rejected, (state, action: any) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        if (action.payload && action.payload.message) {
          Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
        } else {
          Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de l\'inscription.' }); 
        }
      })
      .addCase(handleLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        storeUserSession(action.payload);
        if (action.payload.user.role === 'ADMIN') {
          window.location.href = '/admin';
        } else if (action.payload.user.role === 'POMPISTE') {
          window.location.href = '/pompiste';
        } else if (action.payload.user.role === 'CLIENT') {
          window.location.href = '/client';
        }
      })
      .addCase(handleLogin.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        if (action.payload && action.payload.message) {
          Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
        } else {
          Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de la connexion.' }); 
        }
      });
  },
});

export default authSlice.reducer;

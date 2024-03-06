import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosNoAuth } from '../../lib/Constants';
import Swal from 'sweetalert2';
import { storeUserSession } from '../../lib/Encryption';


// Async thunk to handle login
export const handleLogin = createAsyncThunk('auth/login', async (formData :any) => {
    try {
      const response = await axiosNoAuth.post('/auth/login',formData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
});

// Async thunk to handle signup
export const handleSignup = createAsyncThunk('auth/signup', async (formData:any) => {
  try {
    const response = await axiosNoAuth.post('/auth/signup',formData);
    return response.data.data;
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
        Swal.fire({icon: 'success', title : "Votre compte a cree avec succes",text: action.payload.message,showConfirmButton: true}).then(()=> {
          window.location.href ='/auth/login'
        })
      })
      .addCase(handleSignup.rejected, (state, action :any) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        console.log(action.payload.message)
        state.error = action.payload.message;
        Swal.fire({icon: 'error', title: 'Ooops!' , text:  state.error})
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        console.log(action.payload)
        storeUserSession(action.payload)
        if (action.payload.user.role === 'ADMIN') {
          window.location.href ='/admin'
        } else if(action.payload.user.role === 'POMPISTE'){
          window.location.href = '/pompiste'
        } else if(action.payload.user.role === 'CLIENT'){
          window.location.href = '/client'
        }
      })
      .addCase(handleLogin.rejected, (state, action :any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        // state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;

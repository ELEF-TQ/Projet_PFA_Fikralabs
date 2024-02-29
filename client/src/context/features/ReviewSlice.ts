import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'; // Import SweetAlert
import { axiosAuth } from '../../lib/Constants'; // Assuming you have an axios instance configured

// Async thunk to create a new review
export const createReview = createAsyncThunk('reviews/create', async (formData :any) => {
  try {
    const response = await axiosAuth.post('/reviews', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'success',title: 'Review Created!',text: 'Your review has been successfully created.',})
      })
      .addCase(createReview.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'error',title: 'Review Creation Failed',text: 'Failed to create the review. Please try again later.',
        });
      });
  },
});

export default reviewsSlice.reducer;

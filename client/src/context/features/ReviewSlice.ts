import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'; // Import SweetAlert
import { axiosAuth } from '../../lib/AxiosBase'; // Assuming you have an axios instance configured

interface ReviewData {
  phone: string;
  matriculeRH: string;
  etoiles: number;
  commentaire: string;
}

// Async thunk to create a new review
export const createReview = createAsyncThunk('reviews/create', async (formData: ReviewData, thunkAPI) => {
  try {
    const response = await axiosAuth.post('/reviews', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to update a review
export const updateReview = createAsyncThunk('reviews/update', async ({ Id, commentaire }: { Id: string, commentaire: string }, thunkAPI) => {
  try {
    console.log(Id);
    console.log(commentaire);
    const response = await axiosAuth.patch(`/reviews/${Id}`, { commentaire });
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});



// Async thunk to fetch all reviews by Pompiste
export const getAllReviewsByPompiste = createAsyncThunk('reviews/fetchAllByPompiste', async (matriculeRH: string, thunkAPI) => {
  try {
    const response = await axiosAuth.get(`/reviews/all-pompiste/${matriculeRH}`);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all reviews by Client
export const getAllReviewsByClient = createAsyncThunk('reviews/fetchAllByClient', async (clientId: string, thunkAPI) => {
  try {
    const response = await axiosAuth.get(`/reviews/all-client/${clientId}`);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
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
        Swal.fire({ icon: 'success', title: 'Avis créé !', text: 'Votre avis a été créé avec succès.' });
      })
      .addCase(createReview.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Échec de la création de l\'avis', text: 'Échec de la création de l\'avis. Veuillez réessayer plus tard.' });
      })
      .addCase(getAllReviewsByPompiste.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllReviewsByPompiste.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.reviews = action.payload;
      })
      .addCase(getAllReviewsByPompiste.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(getAllReviewsByClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllReviewsByClient.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.reviews = action.payload;
      })
      .addCase(getAllReviewsByClient.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export default reviewsSlice.reducer;

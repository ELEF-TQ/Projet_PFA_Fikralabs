import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants'; // Assuming you have an axios instance configured

// Async thunk to fetch all pompistes
export const getPompistes = createAsyncThunk('pompistes/fetchAll', async () => {
  try {
    const response = await axiosAuth.get('/pompistes');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to create a new pompiste
export const createPompiste = createAsyncThunk('pompistes/create', async (formData :any) => {
  try {
    const response = await axiosAuth.post('/pompistes', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to update a pompiste
export const updatePompiste = createAsyncThunk('pompistes/update',
  async ({ Id, formData }: { Id: string, formData: any }) => {
    try {
      const response = await axiosAuth.patch(`/pompistes/${Id}`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to fetch a single pompiste by matriculeRH
export const getPompiste = createAsyncThunk('pompistes/fetch', async (matriculeRH: string) => {
  try {
    const response = await axiosAuth.get(`/pompistes/${matriculeRH}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch pompiste'); // Handle error more gracefully
  }
});
  


const initialState = {
  pompiste:null,
  pompistes: [],
  isLoading: false,
  error: null,
};

const pompistesSlice = createSlice({
  name: 'pompistes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPompistes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getPompistes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pompistes = action.payload;
    })
    .addCase(getPompistes.rejected, (state, action) => {
      state.isLoading = false;
    })
    .addCase(getPompiste.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getPompiste.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pompiste = action.payload;
    })
    .addCase(getPompiste.rejected, (state, action) => {
      state.isLoading = false;
    })

     
  },
});

export default pompistesSlice.reducer;

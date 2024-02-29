import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants'; // Assuming you have an axios instance configured

// Async thunk to fetch all pompistes
export const GetPompistes = createAsyncThunk('pompistes/fetchAll', async () => {
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

  


const initialState = {
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
    .addCase(GetPompistes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(GetPompistes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pompistes = action.payload;
    })
    .addCase(GetPompistes.rejected, (state, action) => {
      state.isLoading = false;
    })
     
  },
});

export default pompistesSlice.reducer;

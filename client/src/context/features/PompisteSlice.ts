import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/AxiosBase'; 

// Async thunk to fetch all pompistes
export const getPompistes = createAsyncThunk('pompistes/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axiosAuth.get('/pompistes');
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to create a new pompiste
export const createPompiste = createAsyncThunk('pompistes/create', async (formData :any, thunkAPI) => {
  try {
    const response = await axiosAuth.post('/pompistes', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to update a pompiste
export const updatePompiste = createAsyncThunk('pompistes/update', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuth.patch(`/pompistes/${Id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch a single pompiste by matriculeRH
export const getPompisteByMatriculeRH = createAsyncThunk('pompistes/fetch', async (matriculeRH: string, thunkAPI) => {
  try {
    const response = await axiosAuth.get(`/pompistes/matriculeRH/${matriculeRH}`);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
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
    .addCase(getPompistes.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getPompisteByMatriculeRH.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getPompisteByMatriculeRH.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pompiste = action.payload;
    })
    .addCase(getPompisteByMatriculeRH.rejected, (state) => {
      state.isLoading = false;
    })

  },
});

export default pompistesSlice.reducer;

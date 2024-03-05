import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2'; 
import { axiosAuth } from '../../lib/Constants'; 

// Async thunk to create a new conversion
export const createConversion = createAsyncThunk('convesions/create', async (pompisteId :string) => {
  try {
    const response = await axiosAuth.post(`/conversions/${pompisteId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to create accept a conversion
export const acceptConversion = createAsyncThunk('convesions/accept', async (id :any) => {
   console.log(id)
    try {
      const response = await axiosAuth.patch(`/conversions/acceptOne/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
});

// Async thunk to accept all conversions
export const acceptAllConversion = createAsyncThunk('convesions/acceptAll', async (ids :any) => {
    try {
      const response = await axiosAuth.patch('/conversions/acceptAll', ids);
      return response.data;
    } catch (error) {
      throw error;
    }
});


// Async thunk to get all conversions
export const getAllConversions = createAsyncThunk('convesions/getAll', async () => {
  try {
    const response = await axiosAuth.get('/conversions');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to get a specific conversion
export const getConversions = createAsyncThunk('convesions/get', async (pompisteId:string) => {
  try {
    const response = await axiosAuth.get(`/conversions/${pompisteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});



const initialState = {
  conversions: [],
  isLoading: false,
  error: null,
};
const ConversionsSlice = createSlice({
  name: 'conversions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConversion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createConversion.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'success', title: 'Conversion Créée!', text: 'Votre conversion a été créée avec succès.'});
      })
      .addCase(createConversion.rejected, (state, action) => {
        state.isLoading = false;
        Swal.fire({icon: 'error', title: 'Échec de la Création de la Conversion', text: action.error.message});
      })
      .addCase(acceptConversion.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'success', title: 'Conversion Acceptée!', text: 'La conversion a été acceptée avec succès.'});
      })
      .addCase(acceptAllConversion.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({icon: 'success', title: 'Toutes les Conversions Acceptées!', text: 'Toutes les conversions ont été acceptées avec succès.'});
      })
      .addCase(getAllConversions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllConversions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversions = action.payload;
      })
      .addCase(getAllConversions.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getConversions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getConversions.fulfilled, (state, action) => {
         state.isLoading = false;
         state.conversions = action.payload;
      })
      .addCase(getConversions.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default ConversionsSlice.reducer;

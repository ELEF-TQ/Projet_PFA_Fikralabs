import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth, axiosAuthMultipart } from '../../lib/AxiosBase'; 
import Swal from 'sweetalert2';

// Async thunk to fetch all pompistes
export const fetchPompistes = createAsyncThunk('pompistes/fetchAll', async (_, thunkAPI) => {
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
    const response = await axiosAuthMultipart.post('/pompistes', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to update a pompiste
export const updatePompiste = createAsyncThunk('pompistes/update', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuthMultipart.post(`/pompistes/updateData/${Id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateProfilePompiste = createAsyncThunk('pompistes/updateProfile', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuthMultipart.post(`/pompistes/updateProfile/${Id}`, formData);
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
    .addCase(fetchPompistes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchPompistes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pompistes = action.payload;
    })
    .addCase(fetchPompistes.rejected, (state) => {
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
    .addCase(createPompiste.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(createPompiste.fulfilled, (state) => {
      state.isLoading = false;
      Swal.fire({
        title: 'Succès!',
        text: 'Le pompiste a été créé avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    })
    .addCase(createPompiste.rejected, (state,action:any) => {
      state.isLoading = false;
      Swal.fire({
        title: 'Erreur!',
        text:action.payload.error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    })
    .addCase(updateProfilePompiste.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateProfilePompiste.fulfilled, (state) => {
      state.isLoading = false;
      Swal.fire('Success!', 'Votre profile a été mise à jour avec succès.', 'success').then(() => {
        window.location.reload();
      });
    })
    .addCase(updateProfilePompiste.rejected, (state, action: any) => {
      state.isLoading = false;
      if (action.payload && action.payload.message) {
        Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
      } else {
        Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de l\'inscription.' }); 
      }
    })
    .addCase(updatePompiste.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updatePompiste.fulfilled, (state) => {
      state.isLoading = false;
      Swal.fire('Success!', 'Le pompiste a été mis à jour avec succès.', 'success');
    })
    .addCase(updatePompiste.rejected, (state, action:any) => {
      state.isLoading = false;
      if (action.payload && action.payload.message) {
        Swal.fire({ icon: 'error', title: 'Erreur!', text: action.payload.message });
      } else {
        Swal.fire({ icon: 'error', title: 'Erreur!', text: 'Une erreur s\'est produite lors de la mise à jour du pompiste.' });
      }
    });
    

  },
});

export default pompistesSlice.reducer;

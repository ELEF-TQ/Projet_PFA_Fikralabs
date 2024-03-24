import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { axiosAuth, axiosAuthMultipart } from '../../lib/AxiosBase'; 

type DeleteParams = {
  EndPoint: string;
  Id?: string;
  ids?: string[];
};

export const updateProfileAdmin = createAsyncThunk('admins/updateProfile', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuthMultipart.post(`/admins/updateProfile/${Id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// deleteItem:
export const deleteItem = createAsyncThunk(
  'delete/deleteItems',
  async (params: DeleteParams, thunkAPI) => {
    try {
      const response = await axiosAuth.delete(`${params.EndPoint}/${params.Id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// destroyItem:
export const destroyItems = createAsyncThunk('destroy/deleteItems',
  async (params: DeleteParams ,thunkAPI) => {
    try {
      const response = await axiosAuth.post(params.EndPoint, {ids: params.ids}); // { data: params.ids }
      console.log(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }  
    }
);


// Async thunk to fetch all admins
export const fetchAdmins = createAsyncThunk('admins/fetch', async (_, thunkAPI) => {
  try {
    const response = await axiosAuth.get('/admins');
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all admins
export const getAdmin = createAsyncThunk('admins/get', async (Id, thunkAPI) => {
  try {
    const response = await axiosAuth.get(`/admins/${Id}`);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to create a new pompiste
export const createAdmin = createAsyncThunk('admins/create', async (formData :any, thunkAPI) => {
  try {
    const response = await axiosAuthMultipart.post('/admins', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});



const initialState = {
  admins :[],
  admin : null,
  isLoading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire('Succès', 'Supprimé avec succès', 'success')})
      .addCase(deleteItem.rejected, (state) => {
        state.isLoading = false;
        Swal.fire('Erreur', 'Échec de la suppression', 'error')})
      .addCase(destroyItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(destroyItems.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire('Succès', 'Détruit avec succès', 'success') })
      .addCase(destroyItems.rejected, (state) => {
        state.isLoading = false;
        Swal.fire('Erreur', 'Échec de la destruction', 'error')})
      .addCase(updateProfileAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileAdmin.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire('Success!', 'Votre profile a été mise à jour avec succès.', 'success').then(() => {
          window.location.reload();
        });
      })
      .addCase(updateProfileAdmin.rejected, (state, action: any) => {
        state.isLoading = false;
        if (action.payload && action.payload.message) {
          Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
        } else {
          Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de la mise à jour du profile.' }); 
        }
      })


      .addCase(fetchAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state) => {
        state.isLoading = false;
        // Handle rejection if necessary
      })
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
      })
      .addCase(getAdmin.rejected, (state) => {
        state.isLoading = false;
        // Handle rejection if necessary
      });
  },
});

export default adminSlice.reducer;

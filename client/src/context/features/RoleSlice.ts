import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { axiosAuth } from '../../lib/AxiosBase';

// Async thunk to create a new Role
export const createRole = createAsyncThunk('roles/create', async (formData:any, thunkAPI) => {
  try {
    const response = await axiosAuth.post('/roles', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to update a Role
export const updateRole = createAsyncThunk('roles/update', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuth.patch(`/roles/${Id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all roles 
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_formData, thunkAPI) => {
  try {
    const response = await axiosAuth.get('/roles');
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  roles: [],
  isLoading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles', 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Role créé !', text: 'Le rôle a été créé avec succès.' });
      })
      .addCase(createRole.rejected, (state, action:any) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Échec de la création de le Role', text: action.payload.message });
      })
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
        Swal.fire({ icon: 'success', title: 'Success', text: action.payload.message });
      })
      .addCase(updateRole.rejected, (state, action:any) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: action.payload.message });
      });
  },
});

export default rolesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { axiosAuth } from '../../lib/AxiosBase';

// Async thunk to create a new Permission
export const createPermission = createAsyncThunk('permissions/create', async (formData, thunkAPI) => {
  try {
    const response = await axiosAuth.post('/permissions', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to update a Permission
export const updatePermission = createAsyncThunk('permissions/update', async ({ id, formData }: { id: string, formData: string }, thunkAPI) => {
  try {
    const response = await axiosAuth.patch(`/permissions/${id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all permissions
export const fetchPermissions = createAsyncThunk('permissions/fetch', async (_formData, thunkAPI) => {
  try {
    const response = await axiosAuth.get('/permissions');
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  permissions: [],
  isLoading: false,
  error: null,
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPermission.fulfilled, (state, action:any) => {
        state.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Permission created!', text: action.payload });
      })
      .addCase(createPermission.rejected, (state, action:any) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Failed to create permission', text: action.payload });
      })
      .addCase(fetchPermissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(updatePermission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.permissions = action.payload;
        Swal.fire({ icon: 'success', title: 'Success', text: action.payload });
      })
      .addCase(updatePermission.rejected, (state, action:any) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: action.payload });
      });
  },
});

export default permissionsSlice.reducer;

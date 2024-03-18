import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth, axiosAuthMultipart } from '../../lib/AxiosBase'; 
import Swal from 'sweetalert2';

// Async thunk to create a new client
export const createClient = createAsyncThunk('clients/create', async (formData: any, thunkAPI) => {
  try {
    console.log(formData);
    const response = await axiosAuthMultipart.post('/clients', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateProfileClient = createAsyncThunk('clients/updateProfile', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuthMultipart.post(`/clients/updateProfile/${Id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch a single client by ID
export const getClient = createAsyncThunk('clients/fetch', async (id: string) => {
  try {
    const response = await axiosAuth.get(`/clients/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch client'); 
  }
});

// Async thunk to update a client
export const updateClient = createAsyncThunk('clients/update', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuthMultipart.post(`/clients/updateData/${Id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all clients
export const fetchClients = createAsyncThunk('clients/fetchAll', async () => {
  try {
    const response = await axiosAuth.get('/clients');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch clients');
  }
});

const initialState = {
  client: null,
  clients: [],
  isLoading: false,
  error: null,
};

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClient.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch client' });
      })
      .addCase(getClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.client = action.payload;
      })
      .addCase(createClient.rejected, (state,action:any) => {
        state.isLoading = false;
        if (action.payload && action.payload.message) {
          Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
        } else {
          Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de la creation.' }); 
        }      })
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Success', text: 'Client created successfully' });
      })
      .addCase(updateClient.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update client' });
      })
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Success', text: 'Client updated successfully' });
      })
      .addCase(fetchClients.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch clients' });
      })
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload;
      })
      .addCase(updateProfileClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileClient.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire('Success!', 'Votre profile a été mise à jour avec succès.', 'success').then(() => {
          window.location.reload();
        });
      })
      .addCase(updateProfileClient.rejected, (state, action: any) => {
        state.isLoading = false;
        if (action.payload && action.payload.message) {
          Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
        } else {
          Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de la mise à jour du profile.' }); 
        }
      });
  },
});

export default clientSlice.reducer;

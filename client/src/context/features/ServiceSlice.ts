import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth, axiosAuthMultipart } from '../../lib/AxiosBase'; 
import Swal from 'sweetalert2';

// Async thunk to create a new service
export const createService = createAsyncThunk('services/create', async (formData: any, thunkAPI) => {
  try {
    console.log(formData);
    const response = await axiosAuthMultipart.post('/services', formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


// Async thunk to update a service
export const updateService = createAsyncThunk('services/update', async ({ Id, formData }: { Id: string, formData: any }, thunkAPI) => {
  try {
    const response = await axiosAuthMultipart.post(`/services/${Id}`, formData);
    return response.data;
  } catch (error:any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk to fetch all service
export const getService = createAsyncThunk('services/fetch', async (id: string) => {
    try {
      const response = await axiosAuth.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch service'); 
    }
  });
  

// Async thunk to fetch all services
export const fetchServices = createAsyncThunk('services/fetchAll', async () => {
  try {
    const response = await axiosAuth.get('/services');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch services');
  }
});

const initialState = {
  service: null,
  services: [],
  isLoading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getService.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch client' });
      })
      .addCase(getService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.service = action.payload;
      })
      .addCase(createService.rejected, (state,action:any) => {
        state.isLoading = false;
        if (action.payload && action.payload.message) {
          Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
        } else {
          Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de la creation.' }); 
        }      })
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'success', title: 'Success', text: 'Service created successfully' });
      })
      .addCase(fetchServices.rejected, (state) => {
        state.isLoading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch services' });
      })
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateService.fulfilled, (state) => {
        state.isLoading = false;
        Swal.fire('Success!', 'service a été mise à jour avec succès.', 'success').then(() => {
          window.location.reload();
        });
      })
      .addCase(updateService.rejected, (state, action: any) => {
        state.isLoading = false;
        if (action.payload && action.payload.message) {
          Swal.fire({ icon: 'error', title: 'Oops!', text: action.payload.message || '' }); 
        } else {
          Swal.fire({ icon: 'error', title: 'Oops!', text: 'Une erreur s\'est produite lors de la mise à jour du service.' }); 
        }
      });
  },
});

export default serviceSlice.reducer;

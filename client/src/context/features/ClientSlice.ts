import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants'; // Assuming you have an axios instance configured

// Async thunk to fetch all clients
export const fetchClients = createAsyncThunk('clients/fetchAll', async () => {
  try {
    const response = await axiosAuth.get('/clients');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to create a new client
export const createClient = createAsyncThunk('clients/create', async (clientData) => {
  try {
    const response = await axiosAuth.post('/clients', clientData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to update a client
export const updateClient = createAsyncThunk('clients/update', async ({ clientId, clientData }: { clientId: string, clientData: any }) => {
  try {
    const response = await axiosAuth.put(`/clients/${clientId}`, clientData);
    return { id: clientId, data: clientData };
  } catch (error) {
    throw error;
  }
});

// Async thunk to delete a client
export const deleteClient = createAsyncThunk('clients/delete', async (clientId: string) => {
  try {
    await axiosAuth.delete(`/clients/${clientId}`);
    return clientId;
  } catch (error) {
    throw error;
  }
});


const initialState = {
  clients: [],
  isLoading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
  },
});

export default clientsSlice.reducer;

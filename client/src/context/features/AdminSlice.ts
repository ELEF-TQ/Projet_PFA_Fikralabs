import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { axiosAuth } from '../../lib/AxiosBase'; 

type DeleteParams = {
  EndPoint: string;
  Id?: string;
  ids?: string[];
};

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


const initialState = {
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
        Swal.fire('Erreur', 'Échec de la destruction', 'error')});
  },
});

export default adminSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { axiosAuth } from '../../lib/AxiosBase'; // Assuming you have an axios instance configured

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
      .addCase(deleteItem.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        Swal.fire('Success', 'Item deleted successfully', 'success');
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        Swal.fire('Error', 'Failed to delete item', 'error');
      })
      .addCase(destroyItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(destroyItems.fulfilled, (state, action) => {
        state.isLoading = false;
        Swal.fire('Success', 'Items destroyed successfully', 'success');
      })
      .addCase(destroyItems.rejected, (state, action) => {
        state.isLoading = false;
        Swal.fire('Error', 'Failed to destroy items', 'error');
      });
  },
});

export default adminSlice.reducer;

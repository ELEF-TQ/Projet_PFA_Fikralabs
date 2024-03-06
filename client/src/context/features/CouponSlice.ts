import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants';

// Async thunk to fetch all coupons
export const fetchAllCoupons = createAsyncThunk('coupons/fetchAll', async () => {
  try {
    const response = await axiosAuth.get('/coupons');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk to reserve a coupon by ID
export const reserveCouponById = createAsyncThunk('coupons/reserveById', async (id: string) => {
  try {
    const response = await axiosAuth.get(`/coupons/reserve/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  coupons: [],
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state) => {
        state.loading = false;
      })
      .addCase(reserveCouponById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reserveCouponById.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(reserveCouponById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default couponSlice.reducer;

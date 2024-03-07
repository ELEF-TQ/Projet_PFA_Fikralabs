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

export const getCouponById = createAsyncThunk('coupons/fetchById', async (id: string) => {
  try {
    const response = await axiosAuth.get(`/coupons/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateCoupon = createAsyncThunk('coupons/update', async ({ id, formData }: { id: string, formData: any }) => {
  try {
    const response = await axiosAuth.patch(`/coupons/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createCoupon = createAsyncThunk('coupons/create', async (formData: any) => {
  try {
    const response = await axiosAuth.post('/coupons', formData);
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
  coupon: null,
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
      })
      .addCase(getCouponById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCouponById.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload
      })
      .addCase(getCouponById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        // state.coupon = action.payload
      })
      .addCase(createCoupon.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        // state.coupon = action.payload
      })
      .addCase(updateCoupon.rejected, (state) => {
        state.loading = false;
      })
  },
});

export default couponSlice.reducer;

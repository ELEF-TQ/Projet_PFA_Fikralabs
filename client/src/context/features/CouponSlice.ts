import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosAuth } from '../../lib/Constants';
import Swal from 'sweetalert2';

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
export const fetchReservedCoupons = createAsyncThunk('coupons/reserveById', async (clientId: string) => {
  try {
    const response = await axiosAuth.get(`/clients/${clientId}/coupons`);
    return response.data;
  } catch (error) {
    throw error;
  }
});


// Async thunk to reserve a coupon by ID
export const reserveCoupon = createAsyncThunk('coupons/reserve', async (formData:any) => {
  try {
    console.log(formData)
    const response = await axiosAuth.post(`/coupons/reserve`,formData);
    return response.data;
  } catch (error) {
    throw error;
  }
});



const initialState = {
  reservedCoupons :[],
  coupon: null,
  coupons: [],
  isLoading: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchReservedCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReservedCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.reservedCoupons = action.payload;
      })
      .addCase(fetchReservedCoupons.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(reserveCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reserveCoupon.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        Swal.fire({icon: 'success', title: 'Le coupon est réservé avec succès!'});
      })
      .addCase(reserveCoupon.rejected, (state , action) => {
        state.isLoading = false;
        Swal.fire({icon: 'error', title: 'Échec de la réservation du coupon!', text: 'vous avez pas suffisamment de points pour réserver ce coupon'});
      })
      .addCase(getCouponById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCouponById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload
      })
      .addCase(getCouponById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.coupon = action.payload
      })
      .addCase(createCoupon.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.coupon = action.payload
      })
      .addCase(updateCoupon.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default couponSlice.reducer;

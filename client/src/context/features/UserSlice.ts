import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: () => {}, 
});


export default userSlice.reducer;

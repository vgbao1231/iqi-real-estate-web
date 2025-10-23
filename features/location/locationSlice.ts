import { createSlice } from '@reduxjs/toolkit';

// --- (Định nghĩa kiểu dữ liệu ở trên code) ---

const initialLocationState = {
  provinces: [],
  districts: { all: [] },
};

const locationSlice = createSlice({
  name: 'location',
  initialState: initialLocationState,
  reducers: {
    setLocationData: (state, action) => {
      state.provinces = action.payload.provinces;
      state.districts = action.payload.districts;
    },
  },
});

export const { setLocationData } = locationSlice.actions;
export default locationSlice.reducer;

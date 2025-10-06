import { EnumResponse } from '@/features/enum/enumApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  enum: EnumResponse | null;
} = {
  enum: null,
};

const enumSlice = createSlice({
  name: 'enum',
  initialState,
  reducers: {
    setEnum: (state, action: PayloadAction<EnumResponse | null>) => {
      state.enum = action.payload;
    },
    clearEnum: (state) => {
      state.enum = null;
    },
  },
});

export const { setEnum, clearEnum } = enumSlice.actions;
export default enumSlice.reducer;

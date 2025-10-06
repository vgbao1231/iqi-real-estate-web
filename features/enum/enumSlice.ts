import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const enumSlice = createSlice({
  name: 'enum',
  initialState: {} as any,
  reducers: {
    setEnum: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
    clearEnum: (state) => {
      return {};
    },
  },
});

export const { setEnum, clearEnum } = enumSlice.actions;
export default enumSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: '계정 관리',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice;

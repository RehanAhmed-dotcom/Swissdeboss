import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logoutUser: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {setUser, logoutUser} = UserSlice.actions;
export default UserSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userType: '',
};

const UserTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserTypeEmpty: (state, action) => {
      state.userType = '';
    },
  },
});

export const {setUserType, setUserTypeEmpty} = UserTypeSlice.actions;
export default UserTypeSlice.reducer;

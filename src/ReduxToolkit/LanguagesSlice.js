// src/features/language/languageSlice.js
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../components/i18n';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    value: 'en',
  },
  reducers: {
    add_language: (state, action) => {
      state.value = action.payload;
      i18n.changeLanguage(action.payload);
      AsyncStorage.setItem('language', action.payload);
    },
  },
});

export const {add_language} = languageSlice.actions;

export default languageSlice.reducer;

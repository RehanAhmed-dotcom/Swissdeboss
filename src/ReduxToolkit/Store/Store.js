import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import storage from '@react-native-async-storage/async-storage';
import UserSlice from '../Auth';
import {persistReducer} from 'redux-persist';
import UserTypeSlice from '../Select_Type';
import languageSlice from '../LanguagesSlice';
let persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'userType', 'language'],
};
let rootReducer = combineReducers({
  user: UserSlice,
  userType: UserTypeSlice,
  language: languageSlice,
});
let persistedReducer = persistReducer(persistConfig, rootReducer);
const Store = configureStore({reducer: persistedReducer});

export default Store;

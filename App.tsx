import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Root from './src/navigation/Root';
import {Provider} from 'react-redux';
import Store from './src/ReduxToolkit/Store/Store';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
const persistor = persistStore(Store);

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

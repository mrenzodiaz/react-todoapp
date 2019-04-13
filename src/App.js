import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './config/redux';
import Todo from './Todo';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Todo/>
    </PersistGate>
  </Provider>
);
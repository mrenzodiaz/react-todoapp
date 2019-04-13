import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import rootReducer from '../store/reducers';

const persistConfig = {
  key: 'renzo-todos',
  storage: storageSession
};

const middleware = [thunk];
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

let storeConfig;

if (process.env.NODE_ENV === 'development') {
  storeConfig = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else if (process.env.NODE_ENV === 'production') {
  storeConfig = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(...middleware))
  );
}

export const store = storeConfig;

export const persistor = persistStore(store);
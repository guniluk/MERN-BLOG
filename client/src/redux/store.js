import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';

// Vite 환경에서 CommonJS 라이브러리 임포트 시 발생할 수 있는 호환성 문제를 해결합니다.
const storageEngine = storage.default ? storage.default : storage;

const rootReducer = combineReducers({ user: userReducer, theme: themeReducer });
const persistConfig = {
  key: 'root',
  storage: storageEngine,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);

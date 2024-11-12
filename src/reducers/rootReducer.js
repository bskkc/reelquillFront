import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // `localStorage` kullanacak
import userReducer from './userReducer';
import quillReducer from './quillReducer';
import { initialState } from '../constants/initialState';
import uiReducer from './uiReducer';
import messageReducer from './messageReducer';
import generalInfoReducer from './generalInfoReducer';
import bookReducer from './bookReducer';
import songReducer from './songReducer';

// Middleware for logging actions
const loggerMiddleware = store => next => action => {
    console.log('Dispatching action:', action);
    const result = next(action);
    console.log('Updated state:', store.getState());
    return result;
};

// Combine middleware
const middleware = [loggerMiddleware];

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Main reducer that combines userReducer and quillReducer
const rootReducer = combineReducers({
    ui: uiReducer,
    userInfo: userReducer,
    quills: quillReducer,
    message: messageReducer,
    generalInfo: generalInfoReducer,
    book: bookReducer,
    song: songReducer,
  });

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer and middleware
const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
);

// Persistor creation for managing rehydration
const persistor = persistStore(store);

export { store, persistor };

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import resultReducer from './result/result.reducer';
import pinReducer from './pin/pin.reducer';
import historyReducer from "./history/history.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['pin', 'history']
};

const rootReducer = combineReducers({
    result: resultReducer,
    pin: pinReducer,
    history: historyReducer
});

export default persistReducer(persistConfig, rootReducer);
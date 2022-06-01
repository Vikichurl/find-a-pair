import { combineReducers, createStore} from '@reduxjs/toolkit';
import { pairReducer } from './pairReducer';
import { roundsReducer } from './roundsReducer';

const rootReducer = combineReducers({pairReducer, roundsReducer});
export const store = createStore(rootReducer);

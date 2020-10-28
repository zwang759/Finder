import HistoryActionTypes from './history.actionTypes';
import {HISTORY_LIMIT} from "./history.enum";

const INITIAL_STATE = {
    searches: []
};

const historyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HistoryActionTypes.ADD_SEARCH_HISTORY:
            const newSearches = state.searches.filter(search => search !== action.payload).slice(0, HISTORY_LIMIT);
            return {
                ...state,
                searches: [action.payload, ...newSearches]
            };
        case HistoryActionTypes.REMOVE_SEARCH_HISTORY:
            return {
                ...state,
                searches: state.searches.filter(search => search !== action.payload)
            };
        default:
            return state;
    }
};

export default historyReducer;
import HistoryActionTypes from './history.actionTypes';

export const addSearchHistory = keywords => ({
    type: HistoryActionTypes.ADD_SEARCH_HISTORY,
    payload: keywords
});


export const removeSearchHistory = keywords => ({
    type: HistoryActionTypes.REMOVE_SEARCH_HISTORY,
    payload: keywords
});
import ResultActionTypes from './result.actionTypes';

const INITIAL_STATE = {
    results: null,
    isFetching: true,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ResultActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            };
        case ResultActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                results: action.payload
            };
        case ResultActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case ResultActionTypes.CLEAR_RESULTS:
            return {
                ...state,
                isFetching: false,
                results: null,
                error: null
            };
        default:
            return state;
    }
};

export default userReducer;
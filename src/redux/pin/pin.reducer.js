import PinActionTypes from './pin.actionTypes';

const INITIAL_STATE = {
    items: []
};

const pinReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PinActionTypes.PIN_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case PinActionTypes.UNPIN_ITEM:
            return {
                ...state,
                items: state.items.filter(
                    item => item.id + item.source !== action.payload.id + action.payload.source
                )
            };
        case PinActionTypes.UPDATE_TAGS:
            return {
                ...state,
                items: state.items.map(item =>
                    (item.id + item.source === action.payload.item.id + action.payload.item.source) ?
                        {...item, tags: action.payload.tags} : item)
            };
        case PinActionTypes.DELETE_A_TAG:
            return {
                ...state,
                items: state.items.map(item =>
                    (item.id + item.source === action.payload.item.id + action.payload.item.source) ?
                        {...item, tags: item.tags.filter(tag => tag !== action.payload.tag)} : item)
            };
        case PinActionTypes.CLEAR_ALL:
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
};

export default pinReducer;
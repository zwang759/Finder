import PinActionTypes from './pin.actionTypes';

export const pinItem = item => ({
    type: PinActionTypes.PIN_ITEM,
    payload: item
});


export const unpinItem = item => ({
    type: PinActionTypes.UNPIN_ITEM,
    payload: item
});

export const updateTags = (item, tags) => ({
    type: PinActionTypes.UPDATE_TAGS,
    payload: {item, tags}
});

export const deleteATag = (item, tag) => ({
    type: PinActionTypes.DELETE_A_TAG,
    payload: {item, tag}
});


export const clearAll = () => ({
    type: PinActionTypes.CLEAR_ALL
});
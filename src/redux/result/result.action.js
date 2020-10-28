import ResultActionTypes from './result.actionTypes';
import {addSourceFieldForSnapshot, firestore} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = (keywords) => ({
    type: ResultActionTypes.FETCH_COLLECTIONS_START,
    payload: keywords
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ResultActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ResultActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = (keywords) => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart(keywords));

        collectionRef
            .get()
            .then(snapshot => {
                const collectionsMap = addSourceFieldForSnapshot(snapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    };
};
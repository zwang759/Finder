import {takeLatest, call, put, all} from 'redux-saga/effects';

import {
    AddDateFieldAndGetMatchedResult,
    firestore
} from '../../firebase/firebase.utils';

import ResultActionTypes from './result.actionTypes';
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./result.action";

export function* fetchCollectionsAsync({payload: keywords}) {
    try {

        const collectionRef = firestore.collection('collections');

        const snapshot = yield collectionRef.get();

        const AfterPostProcess = yield call(
            AddDateFieldAndGetMatchedResult,
            snapshot, keywords
        );

        yield put(fetchCollectionsSuccess(AfterPostProcess));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ResultActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* resultSagas() {
    yield all([call(fetchCollectionsStart)]);
}

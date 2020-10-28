import { all, call } from 'redux-saga/effects';

import { resultSagas } from './result/result.saga';

export default function* rootSaga() {
    yield all([call(resultSagas)]);
}
import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions/index';

export function* initParagraphsSaga(action) {
    try {
        const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
        yield put(actionCreators.fetchParagraphsSuccess(response.data));
    } catch (error) {
        yield put(actionCreators.fetchParagraphsFail(action.error));
    }
}

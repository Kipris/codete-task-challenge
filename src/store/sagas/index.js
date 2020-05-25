import { takeEvery, all } from 'redux-saga/effects';

import * as actions from '../actions/actionTypes';
import { initParagraphsSaga } from './paragraphs';

export function* watchParagraphs() {
    yield all([
        takeEvery(actions.FETCH_PARAGRAPHS, initParagraphsSaga)
    ]);
}

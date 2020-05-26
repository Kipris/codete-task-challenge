import * as actions from './actionTypes';
import axios from 'axios';

export const fetchParagraphsStart = () => {
    return {
        type: actions.FETCH_PARAGRAPHS_START
    }
}

export const fetchParagraphsSuccess = (payload) => {
    return {
        type: actions.FETCH_PARAGRAPHS_SUCCESS,
        payload
    }
}

export const fetchParagraphsFail = (error) => {
    return {
        type: actions.FETCH_PARAGRAPHS_FAIL,
        error
    }
}

export const fetchParagraphs = (payload) => {
    return async dispatch => {
        dispatch(fetchParagraphsStart());
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/`, {
                params: {
                    _page: payload.page,
                    _limit: payload.paragraphsPerPage,
                    q: payload.searchString
                }
            });
            return dispatch(fetchParagraphsSuccess({
                paragraphs: response.data,
                page: payload.page,
                totalCount: +response.headers['x-total-count'],
                searchString: payload.searchString
            }));
        } catch (error) {
            return dispatch(fetchParagraphsFail(error));
        }
    }
}

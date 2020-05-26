import * as actions from './actionTypes';
import axios from 'axios';

export const fetchParagraphStart = () => {
    return {
        type: actions.FETCH_PARAGRAPH_START
    }
}

export const fetchParagraphSuccess = (payload) => {
    return {
        type: actions.FETCH_PARAGRAPH_SUCCESS,
        payload
    }
}

export const fetchParagraphFail = (error) => {
    return {
        type: actions.FETCH_PARAGRAPH_FAIL,
        error
    }
}

export const fetchParagraph = (payload) => {
    return async dispatch => {
        dispatch(fetchParagraphStart());
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/`, {
                params: {
                    id: payload.paragraphId
                }
            });
            return dispatch(fetchParagraphSuccess({
                paragraph: response.data
            }));
        } catch (error) {
            return dispatch(fetchParagraphFail(error));
        }
    }
}

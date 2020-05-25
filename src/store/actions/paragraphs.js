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
    return dispatch => {
        dispatch(fetchParagraphsStart());
        let params = `?_page=${payload.page}&_limit=${payload.paragraphsPerPage}`;
        if (payload.searchString) {
          params += `&title_like=${payload.searchString}`;
        }
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params}`)
          .then(response => {
            dispatch(fetchParagraphsSuccess({
                paragraphs: response.data,
                page: payload.page,
                totalCount: +response.headers['x-total-count'],
                filteredParagraphs: payload.searchString ? response.data : null,
                searchString: payload.searchString,
            }));
          })
          .catch(error => {
            console.error(error);
            dispatch(fetchParagraphsFail(error));
          });
    }
}

export const filterParagraphs = (payload) => {
    return dispatch => {
        dispatch(fetchParagraphsStart());
        let params = `?title_like=${payload.searchString}&_limit=${payload.paragraphsPerPage}`;
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params}`)
          .then(response => {
            dispatch(fetchParagraphsSuccess({
                filteredParagraphs: response.data,
                searchString: payload.searchString,
                page: payload.page,
                totalCount: +response.headers['x-total-count']
            }));
          })
          .catch(error => {

          });
    }
}

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
                totalCount: +response.headers['x-total-count']
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
        let params = `?_page=${payload.page}&_limit=${payload.paragraphsPerPage}`;
        if (payload.searchString) {
          params += `&title_like=${payload.searchString}`;
        }
        axios.get(`https://jsonplaceholder.typicode.com/posts/${params}`)
          .then(response => {
            // FILTER:
            // let params = `?title_like=${value}&_limit=${paragraphsPerPage}`;

            // const filteredParagraphs = res;
            // setSearchResults(filteredParagraphs);
            // setParagraphsCount(response.headers.get('X-Total-Count'));
            // setSearchCount(response.headers.get('X-Total-Count'));
            // const searchParam = currentPage === 1 ? `?search=${value}` : `?page=${currentPage}&search=${value}`;
            // history.push({
            //     pathname: '/paragraphs',
            //     search: searchParam
            // })
            // setLoading(false);
          })
          .catch(error => {

          });
    }
}

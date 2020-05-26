import * as actions from '../actions/actionTypes';

const initialState = {
    paragraphs: [],
    loading: false,
    error: null,
    pagination: {
        currentPage: null,
        totalCount: 0
    }
}

const fetchParagraphsStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const fetchParagraphsSuccess = (state, action) => {
    return {
        ...state,
        paragraphs: action.payload.paragraphs,
        pagination: {
            ...state.pagination,
            currentPage: action.payload.page,
            totalCount: action.payload.totalCount
        },
        loading: false
    }
}

const fetchParagraphsFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_PARAGRAPHS_START: return fetchParagraphsStart(state, action);
        case actions.FETCH_PARAGRAPHS_SUCCESS: return fetchParagraphsSuccess(state, action);
        case actions.FETCH_PARAGRAPHS_FAIL: return fetchParagraphsFail(state, action);
        default: return state;
    }
}

export default reducer;

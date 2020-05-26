import * as actions from '../actions/actionTypes';

const initialState = {
    paragraphs: [],
    loading: false,
    error: null,
    searchString: null,
    pagination: {
        currentPage: null,
        totalCount: 0
    },
    paragraph: {}
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
        searchString: action.payload.searchString,
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

const fetchParagraphStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const fetchParagraphSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        paragraph: action.payload.paragraph[0]
    }
}

const fetchParagraphFail = (state, action) => {
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
        case actions.FETCH_PARAGRAPH_START: return fetchParagraphStart(state, action);
        case actions.FETCH_PARAGRAPH_SUCCESS: return fetchParagraphSuccess(state, action);
        case actions.FETCH_PARAGRAPH_FAIL: return fetchParagraphFail(state, action);
        default: return state;
    }
}

export default reducer;

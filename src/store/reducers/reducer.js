import * as actions from '../actions/actionTypes';

const initialState = {
    paragraphs: [],
    loading: false,
    error: null,
    pagination: {
        pages: [],
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
    let ids = Object.values(action.payload.paragraphs).map(value => value.id);
    let pages = [...state.pagination.pages];

    let dataIsLoaded = false;
    for (let i in pages) {
        dataIsLoaded = pages[i].ids.includes(ids[0]) || dataIsLoaded
    }

    let updatedPage = [];
    let updatedParagraphs = [];
    if (!dataIsLoaded) {
        updatedPage = [{ids, fetched: true}]
        updatedParagraphs = action.payload.paragraphs.map(paragraph => {
            return {
                pageNumber: action.payload.page,
                ...paragraph
            }
        });
    }
 
    return {
        ...state,
        paragraphs: state.paragraphs.concat(updatedParagraphs),
        pagination: {
            ...state.pagination,
            pages: state.pagination.pages.concat(updatedPage),
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

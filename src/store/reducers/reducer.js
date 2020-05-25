import * as actions from '../actions/actionTypes';

const initialState = {
    paragraphs: {},
    loading: false,
    error: null,
    pagination: {
        pages: [
            {
                ids: [1, 2, 3, 4, 5],
                fetched: false
            },
            {
                ids: [6, 7, 8, 9, 10],
                fetched: false
            }
        ],
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
    let updatedPages = [];
    
    if (pages.length) {
        let foundPageId = false;
        for (let i in pages) {
            if (ids[0] === pages[i].ids[0]) {
                foundPageId = i;
                break;
            }
        }
        let updatedPage = {};
        if (foundPageId) {
            updatedPage = {
                ...pages[foundPageId],
                fetched: true
            }
            updatedPages = [
                ...state.pagination.pages
            ]
            updatedPages[foundPageId] = updatedPage;
        } else {
            updatedPage = {ids, fetched: true}
            updatedPages = [
                ...state.pagination.pages,
                {...updatedPage}
            ];
        }
    } else {
        updatedPages = [
            ...state.pagination.pages,
            {ids, fetched: true}
        ]
    }
    return {
        ...state,
        paragraphs: {
            ...state.paragraphs,
            ...action.payload.paragraphs
        },
        pagination: {
            ...state.pagination,
            pages: [
                ...state.pagination.pages,
                ...updatedPages
            ],
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

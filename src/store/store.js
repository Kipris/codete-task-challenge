import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import paragraphsReducer from './reducers/paragraphsReducer';

const rootReducer = combineReducers({
    paragraphs: paragraphsReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)));

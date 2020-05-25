import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import paragraphReducer from './reducers/reducer';
import { watchParagraphs } from './sagas/index'; 

const rootReducer = combineReducers({
    paragraph: paragraphReducer
});
  
// const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)));

// sagaMiddleware.run(watchParagraphs);

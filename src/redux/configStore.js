import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import competeReducer from './reducers/compete';
import questionsReducer from './reducers/questions';

const rootReducer = combineReducers( { 
    auth: authReducer, 
    compete: competeReducer,
    questions: questionsReducer 
} );

let composeEnhancers = compose;

if ( __DEV__ ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
    return createStore( 
        rootReducer,
        composeEnhancers( applyMiddleware( thunk ) )
     );
};

export default configStore;
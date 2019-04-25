import { createStore, combineReducers, compose } from 'redux';
import testReducer from './reducers/test';

const rootReducer = combineReducers( { test: testReducer } );

let composeEnhancers = compose;

if ( __DEV__ ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configStore = () => {
    return createStore( 
        rootReducer,
        composeEnhancers()
     );
};

export default configStore;
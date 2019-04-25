import { createStore, combineReducers } from 'redux';
import testReducer from './reducers/test';

const rootReducer = combineReducers( { test: testReducer } );

const configStore = () => {
    return createStore( 
        rootReducer
     );
};

export default configStore;
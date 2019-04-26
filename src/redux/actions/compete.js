import { SET_READY, CLEAR_READY } from './ActionTypes';
import { READY_STATE_KEY } from '../../utils/constants';
import { AsyncStorage } from 'react-native';

export const toggleReadyState = () => {
    return ( dispatch, getState ) => {
        const isReady = getState().compete.ready;
        AsyncStorage.setItem( 
            READY_STATE_KEY, 
            (!isReady).toString(), 
            error => {
                if ( !error ) {
                    dispatch( isReady? clearReady(): setReady() );
                }
        } );
    };
};

export const setReady = () => {
    return {
        type: SET_READY
    };
};

export const clearReady = () => {
    return {
        type: CLEAR_READY
    };
};
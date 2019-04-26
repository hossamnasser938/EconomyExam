import { SET_READY, CLEAR_READY } from './ActionTypes';
import { READY_STATE_KEY } from '../../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';

export const updateReadyState = isReady => {
    return dispatch => {
        AsyncStorage.setItem( 
            READY_STATE_KEY, 
            isReady.toString(), 
            error => {
                if ( !error ) {
                    dispatch( isReady? setReady(): clearReady() );
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
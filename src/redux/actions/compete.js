import { START_LOADING, STOP_LOADING, SET_READY, CLEAR_READY, SET_ERROR, CLEAR_ERROR, SET_SUCCESS, CLEAR_SUCCESS } from './ActionTypes';
import { READY_STATE_KEY } from '../../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

export const updateReadyState = isReady => {
    const currentUserID = firebase.auth().currentUser.uid;

    return dispatch => {
        dispatch( competeStartLoading() );

        firebase.database().ref( "users" ).child( currentUserID ).child( "active" )
            .set( isReady )
            .then( response => {
                return AsyncStorage.setItem( 
                    READY_STATE_KEY, 
                    isReady.toString() 
                );
            } )
            .then( response => {
                dispatch( competeStopLoading() );
                dispatch( competeSetSuccess() );
                dispatch( isReady? setReady(): clearReady() );
            } )
            .catch( error => {
                console.log( "Error ocurred:", error );
                dispatch( competeStopLoading() );
                dispatch( competeSetError( error ) );
            } );
    };
};

export const competeStartLoading = () => {
    return {
        type: START_LOADING
    };
};

export const competeStopLoading = () => {
    return {
        type: STOP_LOADING
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

export const competeSetSuccess = () => {
    return {
        type: SET_SUCCESS
    };
};

export const competeClearSuccess = () => {
    return {
        type: CLEAR_SUCCESS
    };
};

export const competeSetError = error => {
    return {
        type: SET_ERROR,
        payload: { error }
    };
};

export const competeClearError = () => {
    return {
        type: CLEAR_ERROR
    };
};
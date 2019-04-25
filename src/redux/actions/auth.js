import { START_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from './ActionTypes';
import firebase from 'react-native-firebase';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const signInActionCreator = ( email, password ) => {
    return dispatch => {
        dispatch( startLoadingActionCreator() );



        dispatch( stopLoadingActionCreator() );
    };
};

export const signUpActionCreator = ( email, name, password ) => {
    return dispatch => {
        dispatch( startLoadingActionCreator() );
        dispatch( clearError() );

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( userCredential => {
                console.log( "successfully created user:", userCredential );
                dispatch( stopLoadingActionCreator() );
                startMainTabs();
            } )
            .catch( error => {
                console.log( "error ocuured:", error );
                dispatch( stopLoadingActionCreator() );
                dispatch( setError( error ) );
            } );        
    };
};

export const startLoadingActionCreator = () => {
    return {
        type: START_LOADING
    };
};

export const stopLoadingActionCreator = () => {
    return {
        type: STOP_LOADING
    };
};

export const setError = error => {
    return {
        type: SET_ERROR,
        payload: { error }
    };
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
};

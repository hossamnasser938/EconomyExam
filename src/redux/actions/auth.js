import { AUTH_SET_SUCCESS, AUTH_CLEAR_SUCCESS, 
    AUTH_START_LOADING, AUTH_STOP_LOADING, 
    AUTH_SET_ERROR, AUTH_CLEAR_ERROR } from './ActionTypes';
import { READY_STATE_KEY, JUST_AUTHED_KEY } from '../../utils/constants';
import { clearReady } from './index';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const signIn = ( email, password, fromCompetition ) => {
    return dispatch => {
        dispatch( authStartLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( userCredential => {
                return AsyncStorage.setItem( JUST_AUTHED_KEY, "authed" );
            } )
            .then( response => {
                dispatch( authStopLoading() );
                startMainTabs( fromCompetition? 2: 0 );
            } )
            .catch( error => {
                dispatch( authStopLoading() );
                dispatch( authSetError( error ) );
            } );
    };
};

export const signUp = ( email, name, password, fromCompetition ) => {
    return dispatch => {
        dispatch( authStartLoading() );

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( userCredential => {
                return firebase.database().ref( "users" )
                    .child( userCredential.user.uid )
                    .set( {
                        name,
                        active: false
                    } );
            } )
            .then( response => {
                return AsyncStorage.setItem( JUST_AUTHED_KEY, "authed" );
            } )
            .then( response => {
                dispatch( authStopLoading() );
                startMainTabs( fromCompetition? 2: 0 );
            } )
            .catch( error => {
                dispatch( authStopLoading() );
                dispatch( authSetError( error ) );
            } );        
    };
};

export const signOut = () => {
    const currentUserID = firebase.auth().currentUser.uid;

    return ( dispatch, getState ) => {
        if ( getState().compete.ready ) {
            dispatch( authStartLoading() );

            firebase.database().ref( "users" ).child( currentUserID ).child( "active" )
            .set( false )
            .then( response => {
                return AsyncStorage.setItem( 
                    READY_STATE_KEY, 
                    "false"
                );
            } )
            .then( response => {
                return firebase.auth().signOut();
            } )
            .then( response => {
                dispatch( authStopLoading() );
                dispatch( authSetSuccess() );
                dispatch( clearReady() );
            } )
            .catch( error => {
                dispatch( authStopLoading() );
                dispatch( authSetError( error ) );
            } );
        }
        else {
            firebase.auth().signOut()
                .then( response => {
                    dispatch( authSetSuccess() );
                } )
                .catch( error => {
                    dispatch( authSetError( error ) );
                } );
        }
    };
};

export const authStartLoading = () => {
    return {
        type: AUTH_START_LOADING
    };
};

export const authStopLoading = () => {
    return {
        type: AUTH_STOP_LOADING
    };
};

export const authSetSuccess = () => {
    return {
        type: AUTH_SET_SUCCESS
    };
};

export const authClearSuccess = () => {
    return {
        type: AUTH_CLEAR_SUCCESS
    };
};

export const authSetError = error => {
    return {
        type: AUTH_SET_ERROR,
        payload: { error }
    };
};

export const authClearError = () => {
    return {
        type: AUTH_CLEAR_ERROR
    };
};

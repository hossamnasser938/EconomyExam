import { COMPETE_START_LOADING, COMPETE_STOP_LOADING, 
    SET_READY, CLEAR_READY, 
    COMPETE_SET_ERROR, COMPETE_CLEAR_ERROR, 
    COMPETE_SET_SUCCESS, COMPETE_CLEAR_SUCCESS,
    NOTIFY_NEW_ACTIVE_USERS } from './ActionTypes';
import { READY_STATE_KEY } from '../../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

export const updateReadyState = isReady => {
    return dispatch => {
        const currentUserID = firebase.auth().currentUser.uid;

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

export const listenOnActiveUsers = () => {
    return dispatch => {
        dispatch( competeStartLoading() );

        firebase.database().ref( "users" ).
            on( "value", 
                dataSnapshot => { 
                    dispatch( filterActiveUsers( dataSnapshot ) );
                } 
            );
    };
}

export const filterActiveUsers = dataSnapshot => {
    const currentUserID = firebase.auth().currentUser.uid;

    return dispatch => {
        console.log( "dataSnapshot:", dataSnapshot );
        const usersObject = dataSnapshot._value;

        const usersArray = [];
        for ( let userObject in usersObject ) {
            usersArray.push( {
                id: userObject,
                ...usersObject[userObject]
            } );
        }
        
        const activeUsers = usersArray.filter( user => user.id !== currentUserID && user.active );
        console.log( "active users:", activeUsers );

        dispatch( competeStopLoading() );
        dispatch( notifyNewActiveUsers( activeUsers ) );
    };
};

export const notifyNewActiveUsers = activeUsersList => {
    return {
        type: NOTIFY_NEW_ACTIVE_USERS,
        payload: { activeUsersList }
    };
};

export const competeStartLoading = () => {
    return {
        type: COMPETE_START_LOADING
    };
};

export const competeStopLoading = () => {
    return {
        type: COMPETE_STOP_LOADING
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
        type: COMPETE_SET_SUCCESS
    };
};

export const competeClearSuccess = () => {
    return {
        type: COMPETE_CLEAR_SUCCESS
    };
};

export const competeSetError = error => {
    return {
        type: COMPETE_SET_ERROR,
        payload: { error }
    };
};

export const competeClearError = () => {
    return {
        type: COMPETE_CLEAR_ERROR
    };
};
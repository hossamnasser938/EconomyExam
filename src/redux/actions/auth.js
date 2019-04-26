import { START_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from './ActionTypes';
import firebase from 'react-native-firebase';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const signInActionCreator = ( email, password, fromCompetition ) => {
    return dispatch => {
        dispatch( startLoadingActionCreator() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( userCredential => {
                console.log( "successfully signed user:", userCredential );
                dispatch( stopLoadingActionCreator() );
                startMainTabs( fromCompetition? 2: 0 );
            } )
            .catch( error => {
                console.log( "error ocuured:", error );
                dispatch( stopLoadingActionCreator() );
                dispatch( setError( error ) );
            } );
    };
};

export const signUpActionCreator = ( email, name, password, fromCompetition ) => {
    return dispatch => {
        dispatch( startLoadingActionCreator() );

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( userCredential => {
                console.log( "successfully created user:", userCredential );
                return firebase.database().ref( "users" )
                    .child( userCredential.user.uid )
                    .set( {
                        name,
                        active: false
                    } );
            } )
            .then( response => {
                console.log( "respnse from database:", response );
                dispatch( stopLoadingActionCreator() );
                startMainTabs( fromCompetition? 2: 0 );
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

import { START_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from './ActionTypes';
import firebase from 'react-native-firebase';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const signIn = ( email, password, fromCompetition ) => {
    return dispatch => {
        dispatch( authStartLoading() );

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( userCredential => {
                console.log( "successfully signed user:", userCredential );
                dispatch( authStopLoading() );
                startMainTabs( fromCompetition? 2: 0 );
            } )
            .catch( error => {
                console.log( "error ocuured:", error );
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
                dispatch( authStopLoading() );
                startMainTabs( fromCompetition? 2: 0 );
            } )
            .catch( error => {
                console.log( "error ocuured:", error );
                dispatch( authStopLoading() );
                dispatch( authSetError( error ) );
            } );        
    };
};

export const authStartLoading = () => {
    return {
        type: START_LOADING
    };
};

export const authStopLoading = () => {
    return {
        type: STOP_LOADING
    };
};

export const authSetError = error => {
    return {
        type: SET_ERROR,
        payload: { error }
    };
};

export const authClearError = () => {
    return {
        type: CLEAR_ERROR
    };
};

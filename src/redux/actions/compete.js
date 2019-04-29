import { COMPETE_START_LOADING, COMPETE_STOP_LOADING, 
    SET_READY, CLEAR_READY, 
    COMPETE_SET_ERROR, COMPETE_CLEAR_ERROR, 
    COMPETE_SET_SUCCESS, COMPETE_CLEAR_SUCCESS,
    NOTIFY_NEW_ACTIVE_USERS,
    NEW_NOTIFICATION,
    SET_NOTIFICATION_PUSHED, CLEAR_NOTIFICATION_PUSHED,
    NOTIFY_NEW_ANSWER,
    UPDATE_TURN,
    SET_QUESTIONS_INDICES,
    SET_MARK } from './ActionTypes';
import getRandomNumbers from '../../data/getRandomNumbers';
import { READY_STATE_KEY } from '../../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import uuidv4 from 'uuid-v4';

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
        const usersObject = dataSnapshot._value;

        const usersArray = [];
        for ( let userObject in usersObject ) {
            usersArray.push( {
                key: userObject,
                ...usersObject[userObject]
            } );
        }
        
        const activeUsers = usersArray.filter( user => user.key !== currentUserID && user.active );

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

export const stopListeningOnActiveUsers = () => {
    return dispatch => {
        firebase.database().ref( "users" ).
            off( "value" );
    };
};

export const listenOnNotifications = () => {
    return dispatch => {
        const currentUserID = firebase.auth().currentUser.uid;

        firebase.database().ref( "users" ).child( currentUserID ).child( "notifications" )
            .on( "child_changed", dataSnapshot => {
                dispatch( handleNotification( dataSnapshot ) );
            } );
    };
};

export const handleNotification = dataSnapshot => {
    return dispatch => {
        if ( dataSnapshot._value.sessionID ) {
            const notification = {
                id: dataSnapshot.key,
                name: dataSnapshot._value.name,
                request: dataSnapshot._value.request,
                sessionID: dataSnapshot._value.sessionID
            };
    
            dispatch( newNotification( notification ) );

            if ( notification.request === "confirm" ) {
                dispatch( updateTurn() );
            }
        }
    };
};

export const newNotification = notification => {
    return {
        type: NEW_NOTIFICATION,
        payload: { notification }
    };
};

export const stopListeningOnNotifications = () => {
    return dispatch => {
        const currentUserID = firebase.auth().currentUser.uid;

        firebase.database().ref( "users" ).child( currentUserID ).child( "notifications" )
            .off( "child_changed" );
    };
};

export const pushNotification = notification => {
    return ( dispatch, getState ) => {
        const currentUserID = firebase.auth().currentUser.uid;

        dispatch( competeStartLoading() );

        const notificationReference = firebase.database().ref( "users" )
                                        .child( notification.recepientID )
                                        .child( "notifications" ).child( currentUserID );

        firebase.database().ref( "users" ).child( currentUserID )
            .once( "value" )
            .then( response => {
                const currentUserName = response._value.name;
                return notificationReference.set( { 
                    name: currentUserName,
                    request: notification.request 
                } )
            } ).then( response => {
                let uniqueSessionID;

                if ( notification.request === "start" ) {
                    uniqueSessionID = uuidv4();
                } else {
                    uniqueSessionID = notification.sessionID;
                    if ( notification.request === "confirm" ) {
                        const questionsCount = getState().questions.questions.length;
                        
                        const randomQuestionsIndices = getRandomNumbers( questionsCount, 0, 50 );
                        const randomQuestionsIndicesStr = "[" + randomQuestionsIndices.toString() + "]";

                        return Promise.all( 
                            [ firebase.database().ref( "sessions" ).child( uniqueSessionID ).child( "questions" ).set( randomQuestionsIndicesStr ),
                              firebase.database().ref( "sessions" ).child( uniqueSessionID ).child( currentUserID ).set( 0 ),
                              notificationReference.child( "sessionID" ).set( uniqueSessionID ) ]
                        );
                    }
                }
    
                return Promise.all( 
                    [notificationReference.child( "sessionID" ).set( uniqueSessionID ), 
                    firebase.database().ref( "sessions" ).child( uniqueSessionID ).child( currentUserID ).set( 0 )] );
            } )
            .then( response => {
                dispatch( competeStopLoading() );
                dispatch( setNotificationPushed( notification.request ) );
            } )
            .catch( error => {
                dispatch( competeStopLoading() );
                dispatch( competeSetError( error ) );
            } );        
    };
};

export const setNotificationPushed = request => {
    return {
        type: SET_NOTIFICATION_PUSHED,
        payload: { request }
    };
};

export const clearNotificationPushed = () => {
    return {
        type: CLEAR_NOTIFICATION_PUSHED
    };
};

export const getQuestionsIndices = () => {
    return ( dispatch, getState ) => {
        dispatch( competeStartLoading() );

        const sessionID = getState().compete.notification.sessionID;

        firebase.database().ref( "sessions" ).child( sessionID ).child( "questions" ).once( "value" )
            .then( dataSnapshot => {
                dispatch( competeStopLoading() );
                dispatch( setQuestionsIndices( dataSnapshot._value ) );
            } )
            .catch( error => {
                dispatch( competeStopLoading() );
                dispatch( competeSetError( error ) );
            } );
    };
};

export const setQuestionsIndices = questionsIndices => {
    return {
        type: SET_QUESTIONS_INDICES,
        payload: { questionsIndices }
    };
};

export const listenOnAnswers = () => {
    return ( dispatch, getState ) => {
        const sessionID = getState().compete.notification.sessionID;

        firebase.database().ref( "sessions" ).child( sessionID )
            .on( "child_added", dataSnapshot => {
                dispatch( handleAnswer( dataSnapshot ) );
            } );
    };
};

export const handleAnswer = dataSnapshot => {
    return dispatch => {
        const currentUserID = firebase.auth().currentUser.uid;

        if ( dataSnapshot._value.id && dataSnapshot._value.id !== currentUserID ) {
            const answer = {
                questionIndex: dataSnapshot._value.questionIndex,
                answerIndex: dataSnapshot._value.answerIndex
            };

            dispatch( notifyNewAnswer( answer ) );
            dispatch( updateTurn() );
        }
    };
};

export const notifyNewAnswer = answer => {
    return {
        type: NOTIFY_NEW_ANSWER,
        payload: { answer }
    };
};

export const stopListeningOnAnswers = () => {
    return ( dispatch, getState ) => {
        const sessionID = getState().compete.notification.sessionID;

        firebase.database().ref( "sessions" ).child( sessionID )
            .off( "child_added" );
    };
};

export const pushAnswer = answer => {
    return ( dispatch, getState ) => {
        const currentUserID = firebase.auth().currentUser.uid;
        const sessionID = getState().compete.notification.sessionID;
        const uniqueID = uuidv4();

        firebase.database().ref( "sessions" ).child( sessionID )
            .child( uniqueID ).set( { 
                id: currentUserID,
                ...answer 
            } )
            .then( response => {
                return firebase.database().ref( "sessions" ).child( sessionID )
                    .child( currentUserID ).once( "value" );
            } )
            .then( dataSnapshot => {
                const mark = answer.answerIndex === answer.correctAnswerIndex? dataSnapshot._value + 1: dataSnapshot._value;
                return firebase.database().ref( "sessions" ).child( sessionID )
                    .child( currentUserID ).set( mark );
            } )
            .then( response => {
                dispatch( updateTurn() )
            } )
            .catch( error => {
                dispatch( competeSetError( error ) );
            } );

    };
};

export const updateTurn = () => {
    return {
        type: UPDATE_TURN
    };
};

export const listenOnMarks = () => {
    return ( dispatch, getState ) => {
        const currentUserID = firebase.auth().currentUser.uid;
        const oponentUserID = getState().compete.notification.id;
        const sessionID = getState().compete.notification.sessionID;        

        firebase.database().ref( "sessions" ).child( sessionID ).child( currentUserID )
            .on( "value", dataSnapshot => {
                dispatch( setMark( "mine", dataSnapshot._value ) );
            } );

        firebase.database().ref( "sessions" ).child( sessionID ).child( oponentUserID )
            .on( "value", dataSnapshot => {
                dispatch( setMark( "his", dataSnapshot._value ) );
            } );
    };
};

export const setMark = ( who, mark ) => {
    return {
        type: SET_MARK,
        payload: { who, mark }
    };
};

export const stopListeningOnMarks = () => {
    return ( dispatch, getState ) => {
        const currentUserID = firebase.auth().currentUser.uid;
        const oponentUserID = getState().compete.notification.id;
        const sessionID = getState().compete.notification.sessionID;        

        firebase.database().ref( "sessions" ).child( sessionID ).child( currentUserID )
            .off( "value" );

        firebase.database().ref( "sessions" ).child( sessionID ).child( oponentUserID )
            .off( "value" );
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
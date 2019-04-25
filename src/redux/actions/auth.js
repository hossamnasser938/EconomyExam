import { START_LOADING, STOP_LOADING } from './ActionTypes';

export const signInActionCreator = ( email, password ) => {
    return dispatch => {
        dispatch( startLoadingActionCreator() );

        setTimeout( () => dispatch( stopLoadingActionCreator() ), 4000 );
    };
};

export const signUpActionCreator = ( email, name, password ) => {
    return dispatch => {
        dispatch( startLoadingActionCreator() );

        setTimeout( () => dispatch( stopLoadingActionCreator() ), 4000 );
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
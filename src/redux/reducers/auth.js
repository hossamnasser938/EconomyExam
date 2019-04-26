import { AUTH_START_LOADING, AUTH_STOP_LOADING, 
    AUTH_SET_SUCCESS, AUTH_CLEAR_SUCCESS, 
    AUTH_SET_ERROR, AUTH_CLEAR_ERROR } from '../actions/ActionTypes';

const initialState = { 
    success: false,
    loading: false,
    error: false,
    errorType: null 
};

const authReducer = ( state = initialState, action ) => {
    let coppiedState = {
        ...state
    };

    switch ( action.type ) {
        case AUTH_START_LOADING:
            coppiedState.loading = true;
            break;
        case AUTH_STOP_LOADING:
            coppiedState.loading = false;
            break;
        case AUTH_SET_ERROR:
            coppiedState.error = true;
            coppiedState.errorType = action.payload.error
            break;
        case AUTH_CLEAR_ERROR:
            coppiedState.error = false;
            coppiedState.errorType = null;
            break;
        case AUTH_SET_SUCCESS:
            coppiedState.success = true;
            break;
        case AUTH_CLEAR_SUCCESS:
            coppiedState.success = false;
            break;
    }

    return coppiedState;
};

export default authReducer;
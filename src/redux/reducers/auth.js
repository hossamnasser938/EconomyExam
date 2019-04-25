import { START_LOADING, STOP_LOADING, SET_ERROR, CLEAR_ERROR } from '../actions/ActionTypes';

const initialState = { 
    loading: false,
    error: false,
    errorType: null 
};

const authReducer = ( state = initialState, action ) => {
    let coppiedState = {
        ...state
    };

    switch ( action.type ) {
        case START_LOADING:
            coppiedState.loading = true;
            break;
        case STOP_LOADING:
            coppiedState.loading = false;
            break;
        case SET_ERROR:
            coppiedState.error = true;
            coppiedState.errorType = action.payload.error
            break;
        case CLEAR_ERROR:
            coppiedState.error = false;
            coppiedState.errorType = null;
            break;
    }

    return coppiedState;
};

export default authReducer;
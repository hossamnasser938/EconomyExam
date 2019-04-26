import { START_LOADING, STOP_LOADING, SET_READY, CLEAR_READY, SET_ERROR, CLEAR_ERROR, SET_SUCCESS, CLEAR_SUCCESS } from '../actions/ActionTypes';

const initialState = {
    loading: false,
    ready: false,
    success: false,
    error: false,
    errorType: null
};

const competeReducer = ( state = initialState, action ) => {
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
        case SET_READY:
            coppiedState.ready = true;
            break;
        case CLEAR_READY:
            coppiedState.ready = false;
            break;
        case SET_ERROR:
            coppiedState.error = true;
            coppiedState.errorType = action.payload.error
            break;
        case CLEAR_ERROR:
            coppiedState.error = false;
            coppiedState.errorType = null;
            break;
        case SET_SUCCESS:
            coppiedState.success = true;
            break;
        case CLEAR_SUCCESS:
            coppiedState.success = false;
            break;
    }

    return coppiedState;
};

export default competeReducer;
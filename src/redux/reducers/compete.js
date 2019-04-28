import { COMPETE_START_LOADING, COMPETE_STOP_LOADING, 
    SET_READY, CLEAR_READY, 
    COMPETE_SET_ERROR, COMPETE_CLEAR_ERROR, 
    COMPETE_SET_SUCCESS, COMPETE_CLEAR_SUCCESS,
    NOTIFY_NEW_ACTIVE_USERS,
    NOTIFY_OPONENT_READY,
    SET_NOTIFICATION_PUSHED, CLEAR_NOTIFICATION_PUSHED } from '../actions/ActionTypes';

const initialState = {
    loading: false,
    ready: false,
    success: false,
    error: false,
    errorType: null,
    activeUsersList: [],
    oponentReady: false,
    oponent: null,
    notificationPushed: false
};

const competeReducer = ( state = initialState, action ) => {
    let coppiedState = {
        ...state
    };

    switch ( action.type ) {
        case COMPETE_START_LOADING:
            coppiedState.loading = true;
            break;
        case COMPETE_STOP_LOADING:
            coppiedState.loading = false;
            break;
        case SET_READY:
            coppiedState.ready = true;
            break;
        case CLEAR_READY:
            coppiedState.ready = false;
            break;
        case COMPETE_SET_ERROR:
            coppiedState.error = true;
            coppiedState.errorType = action.payload.error
            break;
        case COMPETE_CLEAR_ERROR:
            coppiedState.error = false;
            coppiedState.errorType = null;
            break;
        case COMPETE_SET_SUCCESS:
            coppiedState.success = true;
            break;
        case COMPETE_CLEAR_SUCCESS:
            coppiedState.success = false;
            break;
        case NOTIFY_NEW_ACTIVE_USERS:
            coppiedState.activeUsersList = action.payload.activeUsersList;
            break;
        case NOTIFY_OPONENT_READY:
            coppiedState.oponentReady = true;
            coppiedState.oponent = action.payload.oponent;
            break;
        case SET_NOTIFICATION_PUSHED:
            coppiedState.notificationPushed = true;
            break;
        case CLEAR_NOTIFICATION_PUSHED:
            coppiedState.notificationPushed = false;
            break;
    }

    return coppiedState;
};

export default competeReducer;
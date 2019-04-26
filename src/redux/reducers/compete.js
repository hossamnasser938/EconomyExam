import { SET_READY, CLEAR_READY } from '../actions/ActionTypes';

const initialState = {
    ready: false
};

const competeReducer = ( state = initialState, action ) => {
    let coppiedState = {
        ...state
    };

    switch ( action.type ) {
        case SET_READY:
            coppiedState.ready = true;
            break;
        case CLEAR_READY:
            coppiedState.ready = false;
            break;
    }

    return coppiedState;
};

export default competeReducer;
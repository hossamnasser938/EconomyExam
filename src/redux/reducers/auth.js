import { START_LOADING, STOP_LOADING } from '../actions/ActionTypes';

const initialState = { 
    loading: false 
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
    }

    return coppiedState;
};

export default authReducer;
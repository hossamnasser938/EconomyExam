import { TEST } from '../actions/ActionTypes';

const initialState = { 
    state: "testing" 
};

const testReducer = ( state = initialState, action ) => {
    let coppiedState = {
        ...state
    };

    switch ( action.type ) {
        case TEST:
            coppiedState.state = "tested";
            break;
    }

    return coppiedState;
};

export default testReducer;
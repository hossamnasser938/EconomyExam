import { QUESTIONS_READY, QUESTIONS_ERROR } from '../actions/ActionTypes';

const initialState = {
    questions: null,
    error: false
};

const questionsReducer = ( state = initialState, action ) => {
    let coppiedState = {
        ...state
    };
    
    switch( action.type ) {
        case QUESTIONS_READY:
            coppiedState.questions = action.payload.questions;
            break;
        case QUESTIONS_ERROR:
            coppiedState.error = true;
            break;
    }

    return coppiedState;
};

export default questionsReducer;
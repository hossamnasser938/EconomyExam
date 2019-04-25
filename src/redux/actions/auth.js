import { START_LOADING, STOP_LOADING } from './ActionTypes';

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
import { QUESTIONS_READY, QUESTIONS_ERROR } from './ActionTypes';
import getAllQuestions from '../../data/getAllQuestions';
import preprocessQuestions from '../../data/preprocessQuestions';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';

export const getQuestionsReady = () => {
    return dispatch => {
        getAllQuestions()
            .then(results => {
                const files = results.map( result => result.name );
                const promises = files.map( file => RNFS.readFileAssets('chapters/' + file) );
                return Promise.all( promises );
            } )
            .then(contents => {
                const chaptersQuestions = contents.
                    map( content => Papa.parse( content ).data )

                const filteredChaptersQuestions = chaptersQuestions.
                    map( chaptersQuestions => preprocessQuestions( chaptersQuestions ) )

                const combinedQuestions = filteredChaptersQuestions.
                    reduce( ( accumulator, singleChapterQuestions ) => 
                        accumulator.concat( singleChapterQuestions ), [] );
                
                dispatch( questionsReady( combinedQuestions ) );                
            })
            .catch( reason => {
                dispatch( questionsError() );
            });
    };
};

export const questionsReady = questions => {
    return {
        type: QUESTIONS_READY,
        payload: { questions }
    };
};

export const questionsError = () => {
    return {
        type: QUESTIONS_ERROR
    };
}
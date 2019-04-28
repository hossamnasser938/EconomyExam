import { QUESTIONS_READY, QUESTIONS_ERROR } from './ActionTypes';
import getAllQuestions from '../../data/getAllQuestions';
import preprocessQuestions from '../../data/preprocessQuestions';
import shuffle from '../../data/shuffleArray';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';

export const getQuestionsReady = () => {
    return dispatch => {
        console.log( "getQuestionsReady" );

        getAllQuestions()
            .then(results => {
                console.log( "result:", results );
                const files = results.map( result => result.name );
                const promises = files.map( file => RNFS.readFileAssets('chapters/' + file) );
                return Promise.all( promises );
            } )
            .then(contents => {
                console.log( "contents:", contents )

                const chaptersQuestions = contents.
                    map( content => Papa.parse( content ).data )
                console.log( "chaptersQuestions:", chaptersQuestions );

                const filteredChaptersQuestions = chaptersQuestions.
                    map( chaptersQuestions => preprocessQuestions( chaptersQuestions ) )
                console.log( "filteredChaptersQuestions:", filteredChaptersQuestions );

                const combinedQuestions = filteredChaptersQuestions.
                    reduce( ( accumulator, singleChapterQuestions ) => 
                        accumulator.concat( singleChapterQuestions ), [] );
                console.log("combinedQuestions:", combinedQuestions);

                const shuffledQuestions = shuffle( combinedQuestions );
                console.log( "shuffledQuestions:", shuffledQuestions );
                    
                dispatch( questionsReady( shuffledQuestions ) );
            })
            .catch( reason => {
                console.log( "error due to:", reason );  
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
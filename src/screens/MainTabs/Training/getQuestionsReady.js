import getAllQuestions from '../../../data/getAllQuestions';
import preprocessQuestions from '../../../data/preprocessQuestions';
import shuffle from '../../../data/shuffleArray';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';

const getQuestionsReady = ( onQuestionsReady, onError ) => {
    console.log( "from start training handler" );

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
                
            onQuestionsReady( shuffledQuestions );
        })
        .catch( reason => {
            console.log( "error due to:", reason );  
            onError();
        });
}

export default getQuestionsReady;
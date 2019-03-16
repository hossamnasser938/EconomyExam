import getAllQuestions from '../../../data/getAllQuestions';
import preprocessQuestions from '../../../data/preprocessQuestions';
import shuffle from '../../../data/shuffleArray';
import Papa from 'papaparse';
import RNFS from 'react-native-fs';

function startTrainingHandler() {
    console.log( "from start training handler" );

    this.props.navigator.showModal( {
        screen: "EconomyExam.LoadingModalScreen",
        animationType: "none",
        overrideBackPress: true
    } );

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

            this.props.navigator.dismissModal( {    
                animationType: "none"
            } );

            this.props.navigator.push( {
                screen: "EconomyExam.TrainQuestionScreen",
                title: "Question",
                passProps: {
                    questions: shuffledQuestions
                }
            } );
        })
        .catch( reason => {
            this.props.navigator.dismissModal( {
            
            } );

            console.log( "error due to:", reason );  
        });
}

export default startTrainingHandler;
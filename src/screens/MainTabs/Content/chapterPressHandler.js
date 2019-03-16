import getChapterQuestions from '../../../data/getChapterQuestions';
import preprocessQuestions from '../../../data/preprocessQuestions';
import Papa from 'papaparse';

function chapterPressHandler ( chapter, toggleTouchables ) {
    console.log( "from chapter press handler with modal" );
    toggleTouchables();

    const chapterQuestionsPromise = getChapterQuestions( chapter );

    chapterQuestionsPromise.then( result => {
        const questions = Papa.parse( result ).data;

        const filteredQuestions = preprocessQuestions( questions )

        this.props.navigator.push( {
            screen: "EconomyExam.ContentQuestionScreen",
            title: "Question",
            passProps: {
                chapterQuestions: filteredQuestions
            }
        } );
    }).catch( reason => {
        toggleTouchables();
        alert( chapter + " does not exist yet");
    });
}

export default chapterPressHandler;
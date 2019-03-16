import getChapterQuestions from '../../../data/getChapterQuestions';
import preprocessQuestions from '../../../data/preprocessQuestions';
import Papa from 'papaparse';

function chapterPressHandler ( chapter ) {
    console.log( "from chapter press handler with modal" );
    this.props.navigator.showModal( {
        screen: "EconomyExam.LoadingModalScreen",
        animationType: "none"
    } );

    const chapterQuestionsPromise = getChapterQuestions( chapter );

    chapterQuestionsPromise.then( result => {
        const questions = Papa.parse( result ).data;

        const filteredQuestions = preprocessQuestions( questions )

        this.props.navigator.dismissModal( {
            animationType: "none"
        } );

        this.props.navigator.push( {
            screen: "EconomyExam.ContentQuestionScreen",
            title: "Question",
            passProps: {
                chapterQuestions: filteredQuestions
            }
        } );
    }).catch( reason => {
        this.props.navigator.dismissModal( {
            animationType: "none"
        } );

        alert( chapter + " does not exist yet");
    });
}

export default chapterPressHandler;
import getChapterQuestions from '../../../data/getChapterQuestions';
import preprocessQuestions from '../../../data/preprocessQuestions';
import Papa from 'papaparse';

function chapterPressHandler ( chapter ) {
    console.log( "from chapter press handler with modal" );
    const chapterQuestionsPromise = getChapterQuestions( chapter );

    this.props.navigator.showModal( {
        screen: "EconomyExam.LoadingModalScreen",
        animationType: "none"
    } );

    chapterQuestionsPromise.then( result => {
        const questions = Papa.parse( result ).data;
        
        this.props.navigator.dismissModal( {
            animationType: "none"
        } );

        const filteredQuestions = preprocessQuestions( questions )

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
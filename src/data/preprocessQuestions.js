// remove fields with value equals ""

const preprocessQuestions = ( questions ) => (
    questions.map( 
        question => 
        ( question.filter( field => field !== "" ) )
    )
);

export default preprocessQuestions;
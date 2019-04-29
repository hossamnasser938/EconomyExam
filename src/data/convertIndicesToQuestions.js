const convertIndicesToQuestions = ( indicesString, questionsArray ) => {
    const indicesArray = JSON.parse( indicesString );

    let newQuestions = new Array( indicesArray.length );

    for ( let i = 0; i < newQuestions.length; i++ ) {
        newQuestions[i] = questionsArray[indicesArray[i]];
    }

    return newQuestions;
};

export default convertIndicesToQuestions;
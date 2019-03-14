import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import styles from '../../components/QuestionBody/styles';

class ContentQuestion extends Component {
    constructor( props ) {
        console.log( "new code" );
        super( props );
        this.state = {
            chapterQuestions: props.chapterQuestions,
            currentQuestionIndex: 0
        };
    }
    
    render() {
        const cQIndex = this.state.currentQuestionIndex; 
        const cQuestion = this.state.chapterQuestions[ cQIndex ];
        const cQHead = cQuestion[0];
        const correctAnswerIndex = cQuestion[ cQuestion.length - 1 ] - 1;
        const cQAnswers = cQuestion.filter( ( value, index ) => index !== 0 && index !== cQuestion.length - 1 );

        const cQAnswersComponents = cQAnswers.map( ( answer, index ) => {
            let itemStyles = [ styles.answerContainer ];
            if ( index == correctAnswerIndex ) {
                itemStyles.push( styles.correctAnswerContainer );
            }

            return(
                <View key = { index } style = { itemStyles }>
                    <Text style = { styles.answerText }>{ answer }</Text>
                </View>
            );
        } );

        return(
            <QuestionBody 
                head = { cQHead }
                answersComponents = { cQAnswersComponents }
            />
        );
    }
}

export default ContentQuestion;
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import styles from '../../components/QuestionBody/styles';

class ContentQuestion extends Component {
    constructor( props ) {
        console.log("all questions", props.chapterQuestions);
        super( props );
        this.state = {
            currentQuestionIndex: 0
        };
    }
    
    nextHandler = () => {
        this.setState( prevState => {
            const newQuestionIndex = prevState.currentQuestionIndex + 1;
            
            if ( newQuestionIndex === this.props.chapterQuestions.length ) {
                alert( "No more Questions" )
                return prevState;
            }
            else {
                return {
                    currentQuestionIndex: newQuestionIndex
                };
            }
        } )
    };

    render() {
        const cQuestion = this.props.chapterQuestions[this.state.currentQuestionIndex]; 
        
        const cQHead = cQuestion[0];
        const correctAnswerIndex = cQuestion[ cQuestion.length - 1 ] - 1;
        const cQAnswers = cQuestion.slice(1, cQuestion.length - 1);
        
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
                nextHandler = { this.nextHandler }
            />
        );
    }
}

export default ContentQuestion;
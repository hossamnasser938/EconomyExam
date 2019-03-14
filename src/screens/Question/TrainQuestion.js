import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import styles from '../../components/QuestionBody/styles';

class TrainQuestion extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            currentQuestionIndex: 0,
            pressedAnswerIndex: -1
        };
    }

    nextHandler = () => {
        this.setState( prevState => {
            const newQuestionIndex = prevState.currentQuestionIndex + 1;
            
            if ( newQuestionIndex === this.props.questions.length ) {
                alert( "No Next Questions" )
                return prevState;
            }
            else {
                return {
                    currentQuestionIndex: newQuestionIndex,
                    pressedAnswerIndex: -1
                };
            }
        } );
    };

    previousHandler = () => {
        this.setState( prevState => {
            const newQuestionIndex = prevState.currentQuestionIndex - 1;
            
            if ( newQuestionIndex === -1 ) {
                alert( "No Previous Questions" )
                return prevState;
            }
            else {
                return {
                    currentQuestionIndex: newQuestionIndex,
                    pressedAnswerIndex: -1
                };
            }
        } );
    };

    onAnswerPressed = ( key ) => {
        console.log( "Item pressed", key )
        this.setState( {
            pressedAnswerIndex: key
        } );
    }

    render() {
        const cQuestion = this.props.questions[this.state.currentQuestionIndex]; 
        
        const cQHead = cQuestion[0];
        const correctAnswerIndex = cQuestion[ cQuestion.length - 1 ] - 1;
        const cQAnswers = cQuestion.slice(1, cQuestion.length - 1);

        const cQAnswersComponents = cQAnswers.map( ( answer, index ) => {
            let itemStyles = [ styles.answerContainer ];
            if ( this.state.pressedAnswerIndex == index ) {
                if ( index == correctAnswerIndex ) {
                    itemStyles.push( styles.correctAnswerContainer );
                }
                else {
                    itemStyles.push( styles.wrongAnswerContainer );
                }
            } 

            return(
                <TouchableOpacity key = { index } onPress = { () => this.onAnswerPressed( index ) }>
                    <View style = { itemStyles }>
                        <Text style = { styles.answerText }>{ answer }</Text>
                    </View>
                </TouchableOpacity>
            );
        } );

        return(
            <QuestionBody 
                head = { cQHead }
                answersComponents = { cQAnswersComponents }
                nextHandler = { this.nextHandler }
                previousHandler = { this.previousHandler }
                currentQuestionNumber = { this.state.currentQuestionIndex + 1 }
                totalQuestionsCount = { this.props.questions.length }
            />
        );
    }
}

export default TrainQuestion;
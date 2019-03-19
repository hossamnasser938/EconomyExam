import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import styles from '../../components/QuestionBody/styles';

class TrainQuestion extends Component {
    constructor( props ) {
        super( props );
        this.questionsCount = (props.questionsCount === 0)? this.props.questions.length : props.questionsCount;
        this.state = {
            currentQuestionIndex: 0,
            pressedAnswerIndex: -1,
            previousEnabled: false,
            nextEnabled: true
        };
    }

    nextHandler = () => {
        this.setState( prevState => {
            const newQuestionIndex = prevState.currentQuestionIndex + 1;
            
            let newPreviousEnabled = prevState.previousEnabled;
            if (  newQuestionIndex === 1 ) {
                newPreviousEnabled = !newPreviousEnabled; 
            }
        
            let newNextEnabled = prevState.nextEnabled;
            if ( newQuestionIndex === this.questionsCount - 1 ) {
                newNextEnabled = !newNextEnabled;
            }

            return {
                currentQuestionIndex: newQuestionIndex,
                previousEnabled: newPreviousEnabled,
                nextEnabled: newNextEnabled,
                pressedAnswerIndex: -1
            };
        } );
    };

    previousHandler = () => {
        this.setState( prevState => {
            const newQuestionIndex = prevState.currentQuestionIndex - 1;
            
            let newPreviousEnabled = prevState.previousEnabled;
            if (  newQuestionIndex === 0 ) {
                newPreviousEnabled = !newPreviousEnabled; 
            }
        
            let newNextEnabled = prevState.nextEnabled;
            if ( newQuestionIndex === this.questionsCount - 2 ) {
                newNextEnabled = !newNextEnabled;
            }

            return {
                currentQuestionIndex: newQuestionIndex,
                previousEnabled: newPreviousEnabled,
                nextEnabled: newNextEnabled,
                pressedAnswerIndex: -1
            };
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
                totalQuestionsCount = { this.questionsCount }
                previousEnabled = { this.state.previousEnabled }
                nextEnabled = { this.state.nextEnabled }
            />
        );
    }
}

export default TrainQuestion;
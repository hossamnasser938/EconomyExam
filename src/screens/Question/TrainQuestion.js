import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import WrapperText from '../../components/UI/WrapperText/WrapperText';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../components/QuestionBody/styles';

import Sound from 'react-native-sound';
Sound.setCategory( "Playback" );

class TrainQuestion extends Component {
    constructor( props ) {
        super( props );
        this.questionsCount = (props.questionsCount === 0 || props.questionsCount > this.props.questions.length)? this.props.questions.length : props.questionsCount;
        this.state = {
            currentQuestionIndex: 0,
            pressedAnswerIndex: -1,
            previousEnabled: false,
            nextEnabled: true
        };

        this.correctSound = new Sound( "correct.wav", Sound.MAIN_BUNDLE, error => {
            if ( error ) {
                console.log( "failed to find correct sound: ", error );
            }
        } );
        
        this.wrongSound = new Sound( "wrong.mp3", Sound.MAIN_BUNDLE, error => {
            if ( error ) {
                console.log( "failed to find correct sound: ", error );
            }
        } );
    }

    static navigatorStyle = {
        navBarBackgroundColor: DARK_BACKGROUND,
        navBarTextColor: DARK_TEXT_COLOR,
        navBarButtonColor: DARK_TEXT_COLOR,
        statusBarColor: DARK_BACKGROUND
    };

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

    onAnswerPressed = ( key, correctAnswerIndex ) => {
        console.log( "Item pressed " + key + " coorect answer " + correctAnswerIndex );

        this.setState( {
            pressedAnswerIndex: key
        } );

        if ( this.correctSound && this.wrongSound ) {
            const sound = key === correctAnswerIndex? this.correctSound: this.wrongSound;

            sound.play( success => {
                console.log( "played: ", success );
                if ( key === correctAnswerIndex && this.state.currentQuestionIndex !== this.questionsCount - 1 ) {
                    setTimeout( this.nextHandler, 2000 );
                }
            } );
        }
    }

    render() {
        const cQuestion = this.props.questions[this.state.currentQuestionIndex]; 
        
        const cQHead = cQuestion[0];
        const correctAnswerIndex = cQuestion[ cQuestion.length - 1 ] - 1;
        const cQAnswers = cQuestion.slice(1, cQuestion.length - 1);

        const cQAnswersComponents = cQAnswers.map( ( answer, index ) => {
            let itemStyles = [ styles.answerText ];
            let content = (
                <View style = { styles.answerContainer }>
                    <View style = { styles.answerTextWrapper }>
                        <WrapperText>
                            <Text style = { itemStyles }>{ answer }</Text>
                        </WrapperText>
                    </View>
                </View>
            );
            if ( this.state.pressedAnswerIndex == index ) {
                let isCorrect = (index == correctAnswerIndex);
                if ( isCorrect ) {
                    itemStyles.push( styles.correctAnswerText );
                } else {
                    itemStyles.push( styles.wrongAnswerText );
                }
                content = (
                    <View style = { styles.answerContainer }>
                        <Icon name = {isCorrect? "md-checkmark": "md-close"} size = { 30 } color = {isCorrect? "green": "red"} />
                        <View style = { { flex: 1 } }/>
                        <View style = { styles.answerTextWrapper }>
                            <WrapperText>
                                <Text style = { itemStyles }>{ answer }</Text>
                            </WrapperText>
                        </View>
                    </View>
                );
            } 

            return(
                <TouchableOpacity key = { index } onPress = { () => this.onAnswerPressed( index, correctAnswerIndex ) }>
                    { content }
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
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import WrapperText from '../../components/UI/WrapperText/WrapperText';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';
import styles from '../../components/QuestionBody/styles';
import Icon from 'react-native-vector-icons/Ionicons';

class ContentQuestion extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            currentQuestionIndex: 0,
            previousEnabled: false,
            nextEnabled: true
        };
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
            if ( newQuestionIndex === this.props.chapterQuestions.length - 1 ) {
                newNextEnabled = !newNextEnabled;
            }

            return {
                currentQuestionIndex: newQuestionIndex,
                previousEnabled: newPreviousEnabled,
                nextEnabled: newNextEnabled
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
            if ( newQuestionIndex === this.props.chapterQuestions.length - 2 ) {
                newNextEnabled = !newNextEnabled;
            }

            return {
                currentQuestionIndex: newQuestionIndex,
                previousEnabled: newPreviousEnabled,
                nextEnabled: newNextEnabled
            };
        } );
    };

    render() {
        const cQuestion = this.props.chapterQuestions[this.state.currentQuestionIndex]; 
        
        const cQHead = cQuestion[0];
        const correctAnswerIndex = cQuestion[ cQuestion.length - 1 ] - 1;
        const cQAnswers = cQuestion.slice(1, cQuestion.length - 1);
        
        const cQAnswersComponents = cQAnswers.map( ( answer, index ) => {
            let itemStyles = [ styles.answerText ];
            let content = (
                <View key = { index } style = { styles.answerContainer }>
                    <View style = { styles.answerTextWrapper }>
                        <WrapperText>
                            <Text style = { itemStyles }>{ answer }</Text>
                        </WrapperText>
                    </View>
                </View>
            );
            if ( index == correctAnswerIndex ) {
                itemStyles.push( styles.correctAnswerText );
                content = (
                    <View key = { index } style = { styles.answerContainer }>
                        <Icon name = "md-checkmark" size = { 30 } color = "green" />
                        <View style = { { flex: 1 } }/>
                        <View style = { styles.answerTextWrapper }>
                            <WrapperText>
                                <Text style = { itemStyles }>{ answer }</Text>
                            </WrapperText>
                        </View>
                        
                    </View>
                );
            }

            return( content );
        } );

        return(
            <QuestionBody 
                head = { cQHead }
                answersComponents = { cQAnswersComponents }
                nextHandler = { this.nextHandler }
                previousHandler = { this.previousHandler }
                currentQuestionNumber = { this.state.currentQuestionIndex + 1 }
                totalQuestionsCount = { this.props.chapterQuestions.length }
                previousEnabled = { this.state.previousEnabled }
                nextEnabled = { this.state.nextEnabled }
            />
        );
    }
}

export default ContentQuestion;
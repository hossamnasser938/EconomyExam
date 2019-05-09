import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import WrapperText from '../../components/UI/WrapperText/WrapperText';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { listenOnAnswers, stopListeningOnAnswers, 
        pushAnswer,
        listenOnMarks,
        stopListeningOnMarks } from '../../redux/actions/index';
import styles from '../../components/QuestionBody/styles';

import Sound from 'react-native-sound';
Sound.setCategory( "Playback" );

class CompeteQuestion extends Component {
    constructor( props ) {
        super( props );
        
        this.questionsCount = (props.questionsCount === 0 || props.questionsCount > this.props.questions.length)? this.props.questions.length : props.questionsCount;
        
        this.state = {
            currentQuestionIndex: 0,
            pressedAnswerIndex: -1,
        };

        this.props.navigator.setTitle( {
            title: this.props.turn === "mine"? "Your Turn": this.props.oponentName + "'s Turn"            
        } );

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

    componentDidMount() {
        this.props.onListenOnAnswers();
        this.props.onListenOnMarks();        
    }

    componentWillUnmount() {
        this.props.onStopListeningOnAnswers();
        this.props.onStopListeningOnMarks();
    }

    componentDidUpdate( prevProps ) {
        if ( JSON.stringify( prevProps.newAnswer ) !== JSON.stringify( this.props.newAnswer ) ) {
            const correctAnswerIndex = this.props.questions[this.state.currentQuestionIndex][ this.props.questions[this.state.currentQuestionIndex].length - 1 ] - 1;

            this.onAnswerPressed( this.props.newAnswer.answerIndex, correctAnswerIndex, false );
        }

        if ( this.props.turn !== prevProps.turn ) {
            this.props.navigator.setTitle( {
                title: this.props.turn === "mine"? "Your Turn": this.props.oponentName + "'s Turn"
            } );
        }

        console.log( "competitionEnded =", this.props.competitionEnded );
        if ( this.props.competitionEnded && !prevProps.competitionEnded ) {
            this.showResult();
        }
    }

    nextHandler = () => {
        this.setState( prevState => {
            const newQuestionIndex = prevState.currentQuestionIndex + 1;

            return {
                currentQuestionIndex: newQuestionIndex,
                pressedAnswerIndex: -1
            };
        } );
    };

    onAnswerPressed = ( key, correctAnswerIndex, push = true ) => {
        if ( push === true && this.props.turn !== "mine" ) {
            this.dropDownAlert.alertWithType( "info", "Wait", "It is " + this.props.oponentName + "'s Turn" );
        } else {
            if ( push ) {
                this.props.onPushAnswer( {
                    questionIndex: this.state.currentQuestionIndex,
                    answerIndex: key,
                    correctAnswerIndex
                } );
            }
    
            this.setState( {
                pressedAnswerIndex: key
            } );
    
            if ( this.correctSound && this.wrongSound ) {
                const sound = key === correctAnswerIndex? this.correctSound: this.wrongSound;
    
                sound.play( success => {    
                    if ( this.state.currentQuestionIndex !== this.questionsCount - 1 ) {
                        setTimeout( this.nextHandler, 2000 );
                    }
                } );
            }
        }
    }

    showResult = () => {
        this.props.navigator.showModal( {
            overrideBackPress: true,
            screen: "EconomyExam.CompetitionResult",
            passProps: {
                myMark: this.props.myMark,
                oponentMark: this.props.oponentMark,
                oponentName: this.props.oponentName,
                popToRoot: this.popToRoot
            }
        } );
    };

    popToRoot = () => {
        this.props.navigator.popToRoot();
    };

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
            <View style = { {flex: 1} }>
                <QuestionBody 
                    head = { cQHead }
                    answersComponents = { cQAnswersComponents }
                    currentQuestionNumber = { this.state.currentQuestionIndex + 1 }
                    totalQuestionsCount = { this.questionsCount }
                    competition = { true }
                    oponentName = { this.props.oponentName }
                    myMark = { this.props.myMark }
                    oponentMark = { this.props.oponentMark }
                />

                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                  closeInterval = { 2000 }
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        newAnswer: state.compete.newAnswer,
        turn: state.compete.turn,
        oponentName: state.compete.notification.name,
        myMark: state.compete.myMark,
        oponentMark: state.compete.oponentMark,
        competitionEnded: state.compete.competitionEnded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onListenOnAnswers: () => dispatch( listenOnAnswers() ),
        onStopListeningOnAnswers: () => dispatch( stopListeningOnAnswers() ),
        onPushAnswer: answer => dispatch( pushAnswer( answer ) ),
        onListenOnMarks: () => dispatch( listenOnMarks() ),
        onStopListeningOnMarks: () => dispatch( stopListeningOnMarks() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( CompeteQuestion );
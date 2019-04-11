import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import DefaultScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import styles from './style';
import getQuestionsReady from './getQuestionsReady';
import WrapperText from '../../../components/UI/WrapperText/WrapperText';


class TrainingScreen extends Component {
    componentWillMount() {
        console.log( "component will mount" );
        getQuestionsReady( this.onQuestionsReady, this.onError );
    }

    constructor( props ) {
        super( props );
        this.state = {
            questions: null,
            error: false,
            input: null,
            invalidInput: false,
            checked: false,
            portraitMode: (Dimensions.get("window").width < 500)? true: false
        }
        Dimensions.addEventListener( "change", this.onDimensionsChange ); 
    }

    onDimensionsChange = event => {
        this.setState( {
            portraitMode: (Dimensions.get("window").width < 500)? true: false
        } );
    };

    componentWillUnmount() {
        Dimensions.removeEventListener( "change", this.onDimensionsChange );
    }

    static navigatorStyle = {
        navBarBackgroundColor: DARK_BACKGROUND,
        navBarTextColor: DARK_TEXT_COLOR,
        statusBarColor: DARK_BACKGROUND
    };

    onQuestionsReady = ( questions ) => {
        this.setState( {
            questions: questions
        } );
    };

    onError = () => {
        this.setState( {
            error: true
        } );
    }

    onChangeInput = newInput => {
        console.log( "input changed: ", newInput );
        this.setState( {
            input: newInput
        } );
    }
    
    checkToDismissModal = () => {
        if ( this.state.questions !== null ) {
            this.props.navigator.dismissModal( {    
                animationType: "none"
            } );
            this.navigateToQuestions();
        }
        else if ( this.state.error ) {
            this.props.navigator.dismissModal( {    
                animationType: "none"
            } );
            alert("Error occurred, please try again");
        }
    }

    showLoadingModal = () => {
        this.props.navigator.showModal( {
            screen: "EconomyExam.LoadingModalScreen",
            animationType: "none",
            overrideBackPress: true,
            passProps: {
                checkToDismissModal: this.checkToDismissModal
            }
        } );
    }

    navigateToQuestions = ( questionsCount ) => {
        this.props.navigator.push( {
            screen: "EconomyExam.TrainQuestionScreen",
            title: "Question",
            passProps: {
                questions: this.state.questions,
                questionsCount
            }
        } );
    }

    validateInput () {
        if ( this.state.input == null || this.state.input == "" ) {
            this.setState( {
                invalidInput: false 
            } );
            return 0;
        }

        const inputAsFloat = parseFloat( this.state.input );
        if ( !Number.isNaN( inputAsFloat ) && Number.isInteger( inputAsFloat ) && inputAsFloat > 0 ) {
            this.setState( {
                input: inputAsFloat,
                invalidInput: false 
            } );
            return inputAsFloat;
        }
        else {
            this.setState( {
                invalidInput: true 
            } );
            return -1;
        }
    }

    onStartTraining = () => {
        questionsCount = this.validateInput();

        if ( questionsCount == -1 ) {
            return;
        }
        
        if ( this.state.questions === null ) {
            if ( this.state.error ) {
                alert("Error occurred, please try again");
            }
            else {
                this.showLoadingModal();
            }
        }
        else {
            this.navigateToQuestions( questionsCount );
        }

    };
    
    render() {
        let content = null;
        if ( this.state.invalidInput ) {
            content = (
                <View style = { styles.fieldContainer }>
                    <WrapperText>
                        <Text style = { styles.errorText}>
                            Enter a Positive Integer, Please
                        </Text>
                    </WrapperText>
                </View>
            );
        }

        return(
            <DefaultScreenContainer style = { this.state.portraitMode? styles.portraitContainer: styles.landscapeContainer }>
                <View style = { styles.wrapper }>
                    <Image source = { require( "../../../assets/quiz.png" ) }/>
                </View>

                <View style = { styles.outerContainer }>
                    <ScrollView contentContainerStyle = { styles.scrollContainer }>
                        <View style = { styles.wrapper }>
                            <View style = { styles.fieldContainer }>
                                <WrapperText>
                                    <Text style = { styles.infoText }>
                                    Specify the number of questions or simply hit START TRAINING to train on all available questions
                                    </Text>
                                </WrapperText>
                            </View>

                            <View style = { styles.fieldContainer }>
                                <DefaultInput
                                placeholder = "Number of Questions"
                                keyboardType = "numeric"
                                onChangeText = { this.onChangeInput }
                                />
                            </View>

                            <View style = { styles.fieldContainer }>
                                <DefaultButton
                                    title = "Start Training"
                                    onPress = { this.onStartTraining }
                                />
                            </View>
                            { content }

                        </View>
                    </ScrollView>
                </View>
            </DefaultScreenContainer>
        );
    }
}

export default TrainingScreen;
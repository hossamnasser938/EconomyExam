import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import DefaultCheckBox from '../../../components/UI/DefaultCheckBox/DefaultCheckBox';
import styles from './style';
import getQuestionsReady from './getQuestionsReady';


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
            checked: false
        } 
    }

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
    
    onChangeCheckBox = newValue => {
        console.log( "new check: ", newValue );
        this.setState( {
            checked: newValue
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
            return 0;
        }
    }

    onStartTraining = () => {
        let questionsCount = null;

        if ( this.state.checked ) {
            questionsCount = 0;
        } 
        else {
            questionsCount = this.validateInput();
            if ( questionsCount == 0 ) {
                return;
            }
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
                    <Text style = { styles.errorText}>
                        Enter a poitive integer number
                    </Text>
                </View>
            );
        }

        return(
            <View style = { styles.container }>
                <View style = { styles.fieldContainer }>
                    <DefaultInput
                    placeholder = "Enter Number of Questions"
                    keyboardType = "numeric"
                    onChangeText = { this.onChangeInput }
                    />
                </View>

                <View style = { styles.fieldContainer }>
                    <DefaultCheckBox 
                        title = "or train on all questions"
                        onValueChange = { this.onChangeCheckBox }
                        value = { this.state.checked }
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
        );
    }
}

export default TrainingScreen;
import React, { Component } from 'react';
import { View } from 'react-native';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import styles from './style';
import getQuestionsReady from './getQuestionsReady';


class TrainingScreen extends Component {
    componentWillMount() {
        console.log( "صباح الفل" );
        console.log( "component will mount" );
        getQuestionsReady( this.onQuestionsReady, this.onError );
    }

    constructor( props ) {
        super( props );
        this.state = {
            questions: null,
            error: false
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

    navigateToQuestions = () => {
        this.props.navigator.push( {
            screen: "EconomyExam.TrainQuestionScreen",
            title: "Question",
            passProps: {
                questions: this.state.questions
            }
        } );
    }

    onStartTraining = () => {
        if ( this.state.questions === null ) {
            if ( this.state.error ) {
                alert("Error occurred, please try again");
            }
            else {
                this.showLoadingModal();
            }
        }
        else {
            this.navigateToQuestions();
        }
    };
    
    render() {
        return(
            <View style = { styles.container }>
                <View style = { styles.inputContainer }>
                    <DefaultInput
                    placeholder = "Enter Number of Questions"
                    keyboardType = "numeric"
                    />
                </View>
                <DefaultButton
                    title = "Start Training"
                    onPress = { this.onStartTraining }
                />
            </View>
        );
    }
}

export default TrainingScreen;
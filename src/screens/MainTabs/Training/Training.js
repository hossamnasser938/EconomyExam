import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import DefaultScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import styles from './style';
import WrapperText from '../../../components/UI/WrapperText/WrapperText';
import { getQuestionsReady } from '../../../redux/actions/index';
import { connect } from 'react-redux';

class TrainingScreen extends Component {
    componentWillMount() {
        this.props.onGetQuestionsReady();
    }

    constructor( props ) {
        super( props );
        
        this.state = {
            input: null,
            checked: false,
            portraitMode: (Dimensions.get("window").width < 500)? true: false
        };

        props.navigator.setOnNavigatorEvent( event => {
            if ( event.id === "toggle_drawer_button" ) {
                this.props.navigator.toggleDrawer( {
                    side: "left"
                } );
            }
        } );

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

    onChangeInput = newInput => {
        this.setState( {
            input: newInput
        } );
    }
    
    checkToDismissModal = () => {
        if ( this.props.questions !== null ) {
            this.props.navigator.dismissModal( {    
                animationType: "none"
            } );
            this.navigateToQuestions();
        }
        else if ( this.props.error ) {
            this.props.navigator.dismissModal( {    
                animationType: "none"
            } );
            this.dropDownAlert.alertWithType( "error", "Error", "Error occurred, please try again" );
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
                questions: this.props.questions,
                questionsCount
            }
        } );
    }

    validateInput () {
        if ( this.state.input == null || this.state.input == "" ) {
            return 0;
        }

        const inputAsFloat = parseFloat( this.state.input );
        if ( !Number.isNaN( inputAsFloat ) && Number.isInteger( inputAsFloat ) && inputAsFloat > 0 ) {
            this.setState( {
                input: inputAsFloat
            } );
            return inputAsFloat;
        }
        else {
            this.dropDownAlert.alertWithType( "error", "Error", "Enter a Positive Integer, Please" );
            return -1;
        }
    }

    onStartTraining = () => {
        questionsCount = this.validateInput();

        if ( questionsCount == -1 ) {
            return;
        }
        
        if ( this.props.questions === null ) {
            if ( this.props.error ) {
                this.dropDownAlert.alertWithType( "error", "Error", "Error occurred, please try again" );
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
        return(
            <DefaultScreenContainer style = { this.state.portraitMode? styles.portraitContainer: styles.landscapeContainer }>
                <View style = { styles.wrapper }>
                    <Image source = { require( "../../../assets/quiz.png" ) }/>
                </View>

                <View style = { styles.outerContainer }>
                    <ScrollView contentContainerStyle = { styles.scrollContainer }>
                        <View style = { styles.wrapper }>
                            <View style = { styles.fieldContainer }>
                                <WrapperText style = { styles.mainText }>
                                    <Text>
                                    Specify the number of questions or simply hit START TRAINING to train on all available questions
                                    </Text>
                                </WrapperText>
                            </View>

                            <View style = { styles.fieldContainer }>
                                <DefaultInput
                                  iconName = "information-circle-outline"
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
                        </View>
                    </ScrollView>
                </View>
                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                />
            </DefaultScreenContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        questions: state.questions.questions,
        error: state.questions.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetQuestionsReady: () => dispatch( getQuestionsReady() )
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( TrainingScreen );
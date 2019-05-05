import React, { Component } from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, Dimensions, BackHandler } from 'react-native';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { setActive, clearActive,
    updateReadyState,
    listenOnActiveUsers, 
    stopListeningOnActiveUsers,
    listenOnNotifications,
    stopListeningOnNotifications,
    pushNotification,
    clearNotificationPushed,
    setReady, clearReady, 
    competeClearError, competeClearSuccess,
    getQuestionsIndices } from '../../../redux/actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import { MaterialDialog } from 'react-native-material-dialog';
import startAuthScreen from '../../Authentication/startAuthScreen';
import DefaultScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import WrapperText from '../../../components/UI/WrapperText/WrapperText';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import ActiveUser from '../../../components/ActiveUser/ActiveUser';
import EmptyActiveUsersList from '../../../components/EmptyActiveUsersList/EmptyActiveUsersList';
import convertIndicesToQuestions from '../../../data/convertIndicesToQuestions';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import { READY_STATE_KEY, GO_AUTH_KEY, JUST_AUTHED_KEY } from '../../../utils/constants';
import styles from './styles';

class Competition extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            input: null,
            checked: false,
            portrait: Dimensions.get( "window" ).height > 500? true: false,
            listening: false,
            senderDialogVisible: false,
            recepientDialogVisible: false,
            clickedUserIndex: -1,
            waiting: false
        };

        props.navigator.setOnNavigatorEvent( event => {
            if ( event.id === "toggle_drawer_button" ) {
                this.props.navigator.toggleDrawer( {
                    side: "left"
                } );
            } 
            else if ( event.id === "didAppear" ) {
                if ( this.props.isReady ) {
                    this.props.onSetActive();
                    
                    if ( !this.state.listening ) {
                        this.setState( { listening: true } );
                        this.props.onListenOnActiveUsers();
                        this.props.onListenOnNotifications();
                    }
                }

                AsyncStorage.getItem( GO_AUTH_KEY )
                    .then( result => {
                        if ( result && result !== "" ) {
                            if ( firebase.auth().currentUser ) {
                                this.iAmReadyHandler();
                            } 
                            else {
                                this.dropDownAlert.alertWithType( "warn", "Warning", "You did not sign in/up" );
                            }
                            
                            AsyncStorage.setItem( GO_AUTH_KEY, "" );
                            AsyncStorage.setItem( JUST_AUTHED_KEY, "" );
                        }
                    } )
                    .catch( error => {
                        console.log( "Error getting GO_AUTH" );
                    } );
            }
            else if ( event.id === "didDisappear" ) {
                if ( this.props.isReady ) {
                    this.props.onClearActive();

                    if ( this.state.listening ) {
                        this.setState( { listening: false } );
                        this.props.onStopListeningOnActiveUsers();
                        this.props.onStopListeningOnNotifications();
                    }
                }
            }
        } );

        BackHandler.addEventListener( 
            "hardwareBackPress", 
            () => {
                BackHandler.exitApp();
                return true;
            }
        );

        Dimensions.addEventListener( "change", this.onDimensionsChange );
    }

    onDimensionsChange = () => {
        this.setState( {
            portrait: Dimensions.get( "window" ).height > 500? true: false
        } )
    };

    componentWillUnmount() {
        BackHandler.removeEventListener( "hardwareBackPress" );

        Dimensions.removeEventListener( "change", this.onDimensionsChange );
    }

    componentWillMount() {
        AsyncStorage.getItem( READY_STATE_KEY )
            .then( result => {
                if ( result && result !== "" ) {
                    if ( result === "true" ) {
                        this.props.onSetReadyState();
                    } else if ( result === "false" ) {
                        this.props.onClearReadyState();
                    } else {
                        console.log( "ready state is neither true not error" );
                    }
                } else {
                    console.log( "ready state is null or empty" );
                }
            } )
            .catch( error => {
                console.log( "Error getting ready state" );
            } ); 
    }

    componentDidUpdate( prevProps ) {
        if ( this.props.isError ) {
            this.dropDownAlert.alertWithType( "error", "Error", this.props.errorType );
            this.props.onClearError();
        }

        if ( this.props.isSuccess ) {
            this.dropDownAlert.alertWithType( "success", "Success", "You can compete now" );
            this.props.onClearSuccess();
        }

        if ( this.props.notificationPushed ) {
            switch ( this.props.notificationRequest ) {
                case "start":
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is sent to " + this.props.activeUsersList[this.state.clickedUserIndex].name + " . Please wait for him to confirm" );
                    this.setState( { waiting: true } );
                    this.props.onClearNotificationPushed();
                    break;
                case "confirm":
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is confirmed. Redirecting you ..." );
                    this.props.onClearNotificationPushed();
                    this.props.onGetQuestionsIndices();
                    break;
                case "cancel":
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is cancelled" );
                    this.props.onClearNotificationPushed();
                    break;
            }
        }

        if ( this.props.notification && JSON.stringify( this.props.notification ) !== JSON.stringify( prevProps.notification ) ) {
            switch ( this.props.notification.request ) {
                case "start":
                    this.setState( { recepientDialogVisible: true } );
                    break;
                case "confirm":
                    this.setState( { waiting: false } );
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is confirmed. Redirecting you ..." );                                        
                    this.props.onGetQuestionsIndices();
                    break;
                case "cancel":
                    this.dropDownAlert.alertWithType( "warn", "Warning", this.props.activeUsersList[this.state.clickedUserIndex].name + " canceled the request" );
                    this.setState( { waiting: false } );
                    break;
            }
        }

        if ( this.props.questionsIndices && JSON.stringify( this.props.questionsIndices ) !== JSON.stringify( prevProps.questionsIndices ) ) {
            const competeQuestions = convertIndicesToQuestions( this.props.questionsIndices, this.props.questions );
            this.navigateToQuestions( competeQuestions, this.props.notification.questionsCount? this.props.notification.questionsCount: this.props.questions.length );
        }
    }

    static navigatorStyle = {
        navBarBackgroundColor: DARK_BACKGROUND,
        navBarTextColor: DARK_TEXT_COLOR, 
        statusBarColor: DARK_BACKGROUND
    };

    iAmReadyHandler = () => {
        if ( firebase.auth().currentUser ) {
            this.props.onUpdateReadyState( true );
            this.setState( { listening: true } );
            this.props.onListenOnActiveUsers();
            this.props.onListenOnNotifications();
        }
        else {
            AsyncStorage.setItem( GO_AUTH_KEY, "just_went" );
            this.dropDownAlert.alertWithType( "info", "Authentication", "You need to sign in/up to use this feature" );
            setTimeout( startAuthScreen, 2500 );
        }
    };

    iAmNotReadyHandler = () => {
        this.setState( { listening: false } );
        this.props.onStopListeningOnActiveUsers();
        this.props.onStopListeningOnNotifications();
        this.props.onUpdateReadyState( false );
    };

    activeUserPressHandler = clickedUserIndex => {
        this.setState( { senderDialogVisible: true, clickedUserIndex } );
    };

    validateInput () {
        if ( this.state.input == null || this.state.input == "" ) {
            return 0;
        }

        const inputAsFloat = parseFloat( this.state.input );
        if ( !Number.isNaN( inputAsFloat ) && Number.isInteger( inputAsFloat ) && inputAsFloat > 0 && inputAsFloat % 2 == 0 ) {
            this.setState( {
                input: inputAsFloat
            } );
            return inputAsFloat;
        }
        else {
            this.dropDownAlert.alertWithType( "error", "Error", "Enter a Positive even Integer, Please" );
            return -1;
        }
    }

    senderOkHandler = () => {
        questionsCount = this.validateInput();

        if ( questionsCount == -1 ) {
            return;
        }

        this.setState( { senderDialogVisible: false } );

        const notification = {
            recepientID: this.props.activeUsersList[this.state.clickedUserIndex].key,
            request: "start",
            questionsCount: this.state.input 
        };
        
        this.props.onPushNotification( notification );
    };

    recepientOkHandler = () => {
        this.setState( { recepientDialogVisible: false } );

        const notification = {
            recepientID: this.props.notification.id,
            request: "confirm",
            questionsCount: this.props.notification.questionsCount,
            sessionID: this.props.notification.sessionID
        };
        
        this.props.onPushNotification( notification );
    };

    recepientCancelHandler = () => {
        this.setState( { recepientDialogVisible: false } );

        const notification = {
            recepientID: this.props.notification.id,
            request: "cancel"
        };
        
        this.props.onPushNotification( notification );
    };    

    navigateToQuestions = ( questions, questionsCount ) => {
        this.props.navigator.push( {
            screen: "EconomyExam.CompeteQuestionScreen",
            title: "Question",
            passProps: {
                questions,
                questionsCount
            }
        } );
    }

    onChangeInput = newInput => {
        this.setState( {
            input: newInput
        } );
    }

    render() {
        let readyUI = (
            <DefaultScreenContainer style = { styles.container }>
                <MaterialDialog
                  title = "Start Competing"
                  visible = { this.state.senderDialogVisible }
                  onOk = { this.senderOkHandler }
                  onCancel = { () => this.setState( { senderDialogVisible: false } ) }
                >
                    <View>
                        <WrapperText style = { { color: "black" } }>
                            <Text>Specify the number of questions or simply hit OK to compete on all available questions</Text>
                        </WrapperText>

                        <DefaultInput 
                          iconName = "information-circle-outline"
                          placeholder = "Number of Questions"
                          keyboardType = "numeric"
                          onChangeText = { this.onChangeInput }
                        />
                    </View>
                </MaterialDialog>

                <MaterialDialog
                  title = "Confirm Competing"
                  visible = { this.state.recepientDialogVisible }
                  onOk = { this.recepientOkHandler }
                  onCancel = { this.recepientCancelHandler }
                >
                    <WrapperText style = { { color: "black" } }>
                        <Text>{ this.props.notification? this.props.notification.name: "test" } wants to compete with you</Text>
                    </WrapperText>
                </MaterialDialog>

                {
                    this.props.activeUsersList.length
                    ? <FlatList
                        style = { styles.listContainer }
                        data = { this.props.activeUsersList }
                        renderItem = { ({ item, index }) => <ActiveUser userName = { item.name } onPress = { () => this.activeUserPressHandler( index ) }/> }         
                      />
                    : <EmptyActiveUsersList />
                }
                
                {
                    this.state.waiting
                    ? <WrapperText>
                        <Text>Wait for {this.state.clickedUserIndex !== -1? this.props.activeUsersList[this.state.clickedUserIndex].name: "test"} to confirm</Text>
                      </WrapperText>
                    : null
                }
                
                <View style = { styles.wrapper }>
                    {
                        this.props.isLoading
                        ? <ActivityIndicator />
                        : <DefaultButton
                            style = { styles.btnWrapper } 
                            title = "I am not Ready"
                            onPress = { this.iAmNotReadyHandler }
                            />
                    }
                </View> 

                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                  closeInterval = { 2000 }
                />
            </DefaultScreenContainer>
        );

        let notReadyUI = (
            <DefaultScreenContainer style = { this.state.portrait? styles.portraitContainer: styles.landscapeContainer }>
                <View style = { styles.imageWrapper }>
                    <Image source = { require( "../../../assets/ready.png" ) }/>
                </View>
                
                <View style = { styles.restWrapper }>
                    <View style = { styles.wrapper }>
                        <WrapperText style = { styles.mainText }>
                            <Text>
                                Are you ready to compete with others?
                            </Text>
                        </WrapperText>
                    </View>
                    <View style = { styles.wrapper }>
                        {
                            this.props.isLoading
                            ? <ActivityIndicator />
                            : <DefaultButton
                                style = { styles.btnWrapper } 
                                title = "I am Ready"
                                onPress = { this.iAmReadyHandler }
                              />
                        }
                    </View>
                </View>

                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                />
            </DefaultScreenContainer>
        );

        return (
            this.props.isReady
            ? readyUI
            : notReadyUI 
        ); 
        
    }
}

const mapStateToProps = state => {
    return {
        isReady: state.compete.ready,
        isSuccess: state.compete.success,
        isError: state.compete.error,
        errorType: state.compete.errorType,
        isLoading: state.compete.loading,
        activeUsersList: state.compete.activeUsersList,
        notification: state.compete.notification,
        notificationPushed: state.compete.notificationPushed,
        notificationRequest: state.compete.notificationRequest,
        questions: state.questions.questions,
        questionsIndices: state.compete.questionsIndices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetActive: () => dispatch( setActive() ),
        onClearActive: () => dispatch( clearActive() ),
        onUpdateReadyState: isReady => dispatch( updateReadyState( isReady ) ),
        onSetReadyState: () => dispatch( setReady() ),
        onClearReadyState: () => dispatch( clearReady() ),
        onClearError: () => dispatch( competeClearError() ),
        onClearSuccess: () => dispatch( competeClearSuccess() ),
        onListenOnActiveUsers: () => dispatch( listenOnActiveUsers() ),
        onStopListeningOnActiveUsers: () => dispatch( stopListeningOnActiveUsers() ),
        onListenOnNotifications: () => dispatch( listenOnNotifications() ),
        onStopListeningOnNotifications: () => dispatch( stopListeningOnNotifications() ),
        onPushNotification: notification => dispatch( pushNotification( notification ) ),
        onClearNotificationPushed: () => dispatch( clearNotificationPushed() ),
        onGetQuestionsIndices: () => dispatch( getQuestionsIndices() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Competition );
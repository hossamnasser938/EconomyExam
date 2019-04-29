import React, { Component } from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, Dimensions, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { updateReadyState,
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
                if ( this.props.isReady && !this.state.listening ) {
                    this.setState( { listening: true } );
                    this.props.onListenOnActiveUsers();
                    this.props.onListenOnNotifications();
                }

                AsyncStorage.getItem( GO_AUTH_KEY )
                    .then( result => {
                        if ( result && result !== "" ) {
                            if ( firebase.auth().currentUser ) {
                                this.dropDownAlert.alertWithType( "success", "Success", "Now you're authenticated", null, 2000 );
                            } 
                            else {
                                this.dropDownAlert.alertWithType( "warn", "Warning", "You did not sign in/up", 2000 );
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
                if ( this.props.isReady && this.state.listening ) {
                    this.setState( { listening: false } );
                    this.props.onStopListeningOnActiveUsers();
                    this.props.onStopListeningOnNotifications();
                }
            }
        } );

        Dimensions.addEventListener( "change", this.onDimensionsChange );
    }

    onDimensionsChange = () => {
        this.setState( {
            portrait: Dimensions.get( "window" ).height > 500? true: false
        } )
    };

    componentWillUnmount() {
        Dimensions.removeEventListener( "change", this.onDimensionsChange );
    }

    componentWillMount() {
        AsyncStorage.getItem( READY_STATE_KEY )
            .then( result => {
                if ( result && result !== "" ) {
                    if ( result === "true" ) {
                        this.props.onSetReadyState();
                    } else if ( result === "false" ) {
                        this.props.onClearReadyState()
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
            this.dropDownAlert.alertWithType( "success", "Success", "You can compete now", null, 2000 );
            this.props.onClearSuccess();
        }

        if ( this.props.notificationPushed ) {
            switch ( this.props.notificationRequest ) {
                case "start":
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is sent to " + this.props.activeUsersList[this.state.clickedUserIndex].name + " . Please wait for him to confirm", null, 2000 );
                    this.setState( { waiting: true } );
                    this.props.onClearNotificationPushed();
                    break;
                case "confirm":
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is confirmed. Redirecting you ...", null, 2000 );
                    this.props.onClearNotificationPushed();
                    this.props.onGetQuestionsIndices();
                    break;
                case "cancel":
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is cancelled", null, 2000 );
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
                    this.dropDownAlert.alertWithType( "info", "Sent", "Request is confirmed. Redirecting you ...", null, 2000 );                                        
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
            this.navigateToQuestions( competeQuestions );
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
            this.dropDownAlert.alertWithType( "info", "Authentication", "You need to sign in/up to use this feature", null, 2000 );
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

    senderOkHandler = () => {
        this.setState( { senderDialogVisible: false } );

        const notification = {
            recepientID: this.props.activeUsersList[this.state.clickedUserIndex].key,
            request: "start"
        };
        
        this.props.onPushNotification( notification );
    };

    recepientOkHandler = () => {
        this.setState( { recepientDialogVisible: false } );

        const notification = {
            recepientID: this.props.notification.id,
            request: "confirm",
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

    navigateToQuestions = ( questions, questionsCount = 50 ) => {
        this.props.navigator.push( {
            screen: "EconomyExam.CompeteQuestionScreen",
            title: "Question",
            passProps: {
                questions,
                questionsCount
            }
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
                    <WrapperText style = { { color: "black" } }>
                        <Text>Are you sure you want to compete with {this.state.clickedUserIndex !== -1? this.props.activeUsersList[this.state.clickedUserIndex].name: "test"} ?</Text>
                    </WrapperText>
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
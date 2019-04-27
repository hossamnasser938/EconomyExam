import React, { Component } from 'react';
import { View, Image, Text, ActivityIndicator, FlatList, Dimensions, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { updateReadyState,
    listenOnActiveUsers, 
    setReady, clearReady, 
    competeClearError, competeClearSuccess } from '../../../redux/actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import startAuthScreen from '../../Authentication/startAuthScreen';
import DefaultScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import WrapperText from '../../../components/UI/WrapperText/WrapperText';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import ActiveUser from '../../../components/ActiveUser/ActiveUser';
import EmptyActiveUsersList from '../../../components/EmptyActiveUsersList/EmptyActiveUsersList';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import { READY_STATE_KEY, GO_AUTH_KEY, JUST_AUTHED_KEY } from '../../../utils/constants';
import styles from './styles';

class Competition extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            portrait: Dimensions.get( "window" ).height > 500? true: false
        };

        props.navigator.setOnNavigatorEvent( event => {
            if ( event.id === "toggle_drawer_button" ) {
                this.props.navigator.toggleDrawer( {
                    side: "left"
                } );
            } 
            else if ( event.id === "didAppear" ) {
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

    componentDidUpdate() {
        if ( this.props.isError ) {
            this.dropDownAlert.alertWithType( "error", "Error", this.props.errorType );
            this.props.onClearError();
        }

        if ( this.props.isSuccess ) {
            this.dropDownAlert.alertWithType( "success", "Success", "You can compete now", null, 2000 );
            this.props.onClearSuccess();
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
        }
        else {
            AsyncStorage.setItem( GO_AUTH_KEY, "just_went" );
            this.dropDownAlert.alertWithType( "info", "Authentication", "You need to sign in/up to use this feature", null, 2000 );
            setTimeout( startAuthScreen, 2500 );
        }
    };

    render() {
        let readyUI = (
            <DefaultScreenContainer style = { styles.container }>
                {
                    this.props.activeUsersList.length
                    ? <FlatList
                        style = { styles.listContainer }
                        data = { this.props.activeUsersList }
                        renderItem = { ({ item }) => <ActiveUser userName = { item.name }/> }         
                      />
                    : <EmptyActiveUsersList />
                }
                
                <View style = { styles.wrapper }>
                    {
                        this.props.isLoading
                        ? <ActivityIndicator />
                        : <DefaultButton
                            style = { styles.btnWrapper } 
                            title = "I am not Ready"
                            onPress = { () => this.props.onUpdateReadyState( false ) }
                            />
                    }
                </View>  

                <Button onPress = { this.props.onListenOnActiveUsers } title = "Listen" />

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
        activeUsersList: state.compete.activeUsersList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateReadyState: isReady => dispatch( updateReadyState( isReady ) ),
        onSetReadyState: () => dispatch( setReady() ),
        onClearReadyState: () => dispatch( clearReady() ),
        onClearError: () => dispatch( competeClearError() ),
        onClearSuccess: () => dispatch( competeClearSuccess() ),
        onListenOnActiveUsers: () => dispatch( listenOnActiveUsers() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Competition );
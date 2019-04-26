import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { updateReadyState, setReady, clearReady } from '../../../redux/actions/index';
import DropdownAlert from 'react-native-dropdownalert';
import startAuthScreen from '../../Authentication/startAuthScreen';
import DefaultScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import WrapperText from '../../../components/UI/WrapperText/WrapperText';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import { READY_STATE_KEY, GO_AUTH_KEY } from '../../../utils/constants';
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
                                this.DropdownAlert.alertWithType( "success", "Success", "Now you're authenticated" );
                            } 
                            else {
                                this.DropdownAlert.alertWithType( "warn", "Warning", "You did not sign in/up" );
                            }
                            AsyncStorage.setItem( GO_AUTH_KEY, "" );
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

    static navigatorStyle = {
        navBarBackgroundColor: DARK_BACKGROUND,
        navBarTextColor: DARK_TEXT_COLOR, 
        statusBarColor: DARK_BACKGROUND
    };

    iAmReadyHandler = () => {
        if ( firebase.auth().currentUser ) {
            this.props.onUpdateReadyState( true );
            this.DropdownAlert.alertWithType( "success", "Success", "You can compete now" )
        }
        else {
            AsyncStorage.setItem( GO_AUTH_KEY, "just_went" );
            this.DropdownAlert.alertWithType( "info", "Authentication", "You need to sign in/up to use this feature" );
            setTimeout( startAuthScreen, 2500 );
        }
    };

    render() {
        return(
            <DefaultScreenContainer style = { this.state.portrait? styles.portraitContainer: styles.landscapeContainer }>
                <View style = { styles.imageWrapper }>
                    <Image source = { require( "../../../assets/ready.png" ) }/>
                </View>
                
                {
                    this.props.isReady
                        ? (
                            <View style = { styles.restWrapper }>
                                <WrapperText style = { styles.mainText }>
                                    <Text>
                                        Yes, I'm ready
                                    </Text>
                                </WrapperText>
                            </View>
                        )
                        : (
                            <View style = { styles.restWrapper }>
                                <View style = { styles.wrapper }>
                                    <WrapperText style = { styles.mainText }>
                                        <Text>
                                            Are you ready to compete with others?
                                        </Text>
                                    </WrapperText>
                                </View>
                                <View style = { styles.wrapper }>
                                    <DefaultButton
                                      style = { styles.btnWrapper } 
                                      title = "I am Ready"
                                      onPress = { this.iAmReadyHandler }
                                    />
                                </View>
                            </View>
                        )
                }

                <DropdownAlert 
                  ref = { ref => this.DropdownAlert = ref }
                  closeInterval = { 2000 }
                />
            </DefaultScreenContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        isReady: state.compete.ready
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateReadyState: isReady => dispatch( updateReadyState( isReady ) ),
        onSetReadyState: () => dispatch( setReady() ),
        onClearReadyState: () => dispatch( clearReady() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Competition );
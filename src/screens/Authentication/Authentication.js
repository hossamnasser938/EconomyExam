import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Dimensions, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { signIn, signUp, authClearError } from '../../redux/actions/index';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultScreenContainer from '../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import AuthInput from '../../components/AuthInput/AuthInput';
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton';
import WrapperText from '../../components/UI/WrapperText/WrapperText';
import validateInputs from '../../utils/validateInputs';
import styles from './styles';
import { DARK_BACKGROUND } from '../../utils/colors';
import { GO_AUTH_KEY } from '../../utils/constants';

class Authentication extends Component {
    static navigatorStyle = {
        statusBarColor: DARK_BACKGROUND
    };

    constructor( props ) {
        super( props );

        this.state = {
            authMode: "login",
            orientation: Dimensions.get( "window" ).width > 500? "landscape": "portrait",
            fromCompetition: false,
            controls: {
                email: {
                    value: "",
                    valid: false,
                    validationRules: { isEmail: "" }
                },
                name: {
                    value: "",
                    valid: false,
                    validationRules: { isName: "" }
                },
                password: {
                    value: "",
                    valid: false,
                    validationRules: { minLength: 6 }
                },
                confirmPassword: {
                    value: "",
                    valid: false,
                    validationRules: { isEqualTo: "password" }
                }
            }        
        };

        BackHandler.addEventListener( 
            "hardwareBackPress", 
            () => startMainTabs( this.state.fromCompetition? 2: 0 ) 
        );

        Dimensions.addEventListener( "change", this.onDimensionsChange );
    }

    onDimensionsChange = () => {
        this.setState( {
            orientation: Dimensions.get( "window" ).width > 500? "landscape": "portrait"        
        } );
    };

    componentWillUnmount() {
        BackHandler.removeEventListener( "hardwareBackPress" );

        Dimensions.removeEventListener( "change", this.onDimensionsChange );
    }

    componentWillMount() {
        AsyncStorage.getItem( GO_AUTH_KEY )
            .then( result => {
                if ( result && result !== "" ) {
                    this.setState( {
                        fromCompetition: true
                    } );
                }
            } )
            .catch( error => {
                console.log( "Error getting GO_AUTH" );
            } );
    }

    componentDidUpdate() {
        if ( this.props.error ) {
            this.dropDownAlert.alertWithType( "error", "Error", this.props.errorType );
            this.props.onClearError();
        }
    }

    toggleAuthMode = () => {
        this.setState( prevState => {
            return {
                authMode: prevState.authMode === "login"? "signup": "login"
            };
        } ); 
    };

    updateInput = ( key, value ) => {
        const connectedValues = {
            password: key === "password"? value: this.state.controls.password.value
        };

        this.setState( prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === "password"
                            ? validateInputs( prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValues ) 
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value,
                        valid: validateInputs( value, prevState.controls[key].validationRules, connectedValues )
                    }
                }
            };
        } );
    };
    
    render() {
        return(
            <ScrollView contentContainerStyle = { {height: Dimensions.get("window").height} }>
                <DefaultScreenContainer>
                    <View style = { styles.mainTextWrapper }>
                        <HeadingText>{ this.state.authMode === "login"? "LogIn": "SignUp"}</HeadingText>
                    </View>

                    <View style = { styles.inputsWrapper }>
                        <AuthInput
                          iconName = "email"
                          placeholder = "E-mail"
                          keyboardType = "email-address"
                          value = { this.state.controls.email.value }
                          updateInput = { this.updateInput }
                          valid = { this.state.controls.email.valid }
                        />
                        {
                            this.state.authMode === "signup"
                            ? (
                                <AuthInput
                                  iconName = "account"
                                  placeholder = "Name"
                                  keyboardType = "default"
                                  value = { this.state.controls.name.value }
                                  updateInput = { this.updateInput }
                                  valid = { this.state.controls.name.valid }
                                />
                            ):
                            null
                        }
                        <View style = { (this.state.orientation === "landscape" && this.state.authMode === "signup")? styles.passwordInputssWrapperLandscape: null }>
                            <AuthInput
                              style = { (this.state.orientation === "landscape" && this.state.authMode === "signup")? styles.passwordInputLandscape: null }
                              iconName = "lock-question"
                              placeholder = "Password"
                              keyboardType = "default"
                              secureTextEntry = { true }
                              value = { this.state.controls.password.value }
                              updateInput = { this.updateInput }
                              valid = { this.state.controls.password.valid }
                            />
                            {
                                this.state.authMode === "signup"
                                ? (
                                    <AuthInput
                                      style = { (this.state.orientation === "landscape" && this.state.authMode === "signup")? styles.passwordInputLandscape: null }
                                      iconName = "lock-question"
                                      placeholder = "Confirm Password"
                                      keyboardType = "default"
                                      secureTextEntry = { true }
                                      value = { this.state.controls.confirmPassword.value }
                                      updateInput = { this.updateInput }
                                      valid = { this.state.controls.confirmPassword.valid }
                                    />
                                ):
                                null
                            }
                        </View>
                    </View>
                    <View style = { styles.buttonsWrapper }>
                        <View style = { styles.btnWrapper }>
                            {
                                this.props.loading
                                ? <ActivityIndicator />
                                : <DefaultButton 
                                    title = { this.state.authMode === "login"? "LogIn": "SignUp" }
                                    onPress = {
                                        this.state.authMode === "login"
                                        ? this.state.controls.email.valid && this.state.controls.password.valid
                                          ? () => this.props.onSignIn( this.state.controls.email.value, this.state.controls.password.value, this.state.fromCompetition )
                                          : () => this.dropDownAlert.alertWithType( "warn", "Warning", "Please enter valid email and password" )
                                        : this.state.controls.email.valid && this.state.controls.name.valid && this.state.controls.password.valid && this.state.controls.confirmPassword.valid
                                          ? () => this.props.onSignUp( this.state.controls.email.value, this.state.controls.name.value, this.state.controls.password.value, this.state.fromCompetition )
                                          : () => this.dropDownAlert.alertWithType( "warn", "Warning", "Please enter valid email, name, password and confirm password" ) 
                                    }
                                  />
                            }
                        </View>
                        <View style = { styles.switchTextWrapper }>
                            <TouchableOpacity onPress = { this.toggleAuthMode }>
                                <WrapperText style = { styles.switchText }>
                                    <Text>
                                        { this.state.authMode === "login"? "Don't have account? SignUp": "Already have account? LogIn"  }
                                    </Text>
                                </WrapperText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </DefaultScreenContainer>

                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                  closeInterval = { 2000 }
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        errorType: state.auth.errorType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: ( email, password, fromCompetition ) => dispatch( signIn( email, password, fromCompetition ) ),
        onSignUp: ( email, name, password, fromCompetition ) => dispatch( signUp( email, name, password, fromCompetition ) ),
        onClearError: () => dispatch( authClearError() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Authentication );
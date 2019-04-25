import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import DefaultScreenContainer from '../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import AuthInput from '../../components/AuthInput/AuthInput';
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton';
import WrapperText from '../../components/UI/WrapperText/WrapperText';
import validateInputs from '../../utils/validateInputs';
import styles from './styles';
import { DARK_BACKGROUND } from '../../utils/colors';

export default class Authentication extends Component {
    static navigatorStyle = {
        statusBarColor: DARK_BACKGROUND
    };

    constructor( props ) {
        super( props );

        this.state = {
            authMode: "login",
            orientation: Dimensions.get( "window" ).width > 500? "landscape": "portrait",
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

        Dimensions.addEventListener( "change", this.onDimensionsChange );
    }

    onDimensionsChange = () => {
        this.setState( {
            orientation: Dimensions.get( "window" ).width > 500? "landscape": "portrait"        
        } );
    };

    componentWillUnmount() {
        Dimensions.removeEventListener( this.onDimensionsChange );
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
                            <DefaultButton 
                              title = { this.state.authMode === "login"? "LogIn": "SignUp" }
                              onPress = { () => this.dropDownAlert.alertWithType( "warn", "Warning", "Not yet" ) }
                            />
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
                />
            </ScrollView>
        );
    }
}
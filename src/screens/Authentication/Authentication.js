import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import DefaultScreenContainer from '../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import AuthInput from '../../components/AuthInput/AuthInput';
import DefaultButton from '../../components/UI/DefaultButton/DefaultButton';
import styles from './styles';
import WrapperText from '../../components/UI/WrapperText/WrapperText';

export default class Authentication extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            authMode: "login",
            orientation: Dimensions.get( "window" ).width > 500? "landscape": "portrait"        }

        Dimensions.addEventListener( "change", this.onDimensionsChange );
    }

    onDimensionsChange = () => {
        this.setState( {
            orientation: Dimensions.get( "window" ).width > 500? "landscape": "portrait"        } );
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
                        />
                        {
                            this.state.authMode === "signup"
                            ? (
                                <AuthInput
                                iconName = "account"
                                placeholder = "Name"
                                keyboardType = "default"
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
                                    />
                                ):
                                null
                            }
                        </View>
                    </View>

                    <View style = { styles.buttonsWrapper }>
                        <View style = { styles.btnWrapper }>
                            <DefaultButton 
                            title = { this.state.authMode === "login"? "LogIn": "SignUp"}
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
            </ScrollView>
        );
    }
}
import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import startAuthScreen from '../../Authentication/startAuthScreen';
import DefaultScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import WrapperText from '../../../components/UI/WrapperText/WrapperText';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import styles from './styles';

export default class Competition extends Component {
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

    static navigatorStyle = {
        navBarBackgroundColor: DARK_BACKGROUND,
        navBarTextColor: DARK_TEXT_COLOR, 
        statusBarColor: DARK_BACKGROUND
    };

    iAmReadyHandler = () => {
        if ( firebase.auth().currentUser ) {
            //TODO: let user compete
            alert( "not yet" );
        }
        else {
            this.DropdownAlert.alertWithType( "info", "Authentication", "You need to sign in/up to use this feature" );
            setTimeout( startAuthScreen, 2300 );
        }
    };

    render() {
        return(
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
                        <DefaultButton
                          style = { styles.btnWrapper } 
                          title = "I am Ready"
                          onPress = { this.iAmReadyHandler }
                        />
                    </View>
                </View>

                <DropdownAlert 
                  ref = { ref => this.DropdownAlert = ref }
                  closeInterval = { 2000 }
                />
            </DefaultScreenContainer>
        );
    }
}
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import DefalautScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import Chapter from '../../../components/Chapter/Chapter';
import chapterPressHandler from './chapterPressHandler';
import { JUST_AUTHED_KEY } from '../../../utils/constants';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import styles from './styles';

class ContentScreen extends Component {
    constructor( props ) {
        super( props );
        
        this.state = {
            touchablesDisabled: false,
            portraitMode: (Dimensions.get("window").height > 500)? true: false
        }

        props.navigator.setOnNavigatorEvent( event => {
            if ( event.id === "willAppear" ) {
                this.enableTouchables();
            } 
            else if ( event.id === "toggle_drawer_button" ) {
                this.props.navigator.toggleDrawer( {
                    side: "left"
                } );
            }
            else if ( event.id === "didAppear" ) {
                AsyncStorage.getItem( JUST_AUTHED_KEY )
                    .then( result => {
                        if ( result && result !== "" ) {
                            if ( firebase.auth().currentUser ) {
                                this.dropDownAlert.alertWithType( "success", "Success", "Now you're authenticated" );
                            }

                            AsyncStorage.setItem( JUST_AUTHED_KEY, "" );
                        }
                    } )
                    .catch( error => {
                        console.log( "Error getting JUST_AUTHED:", error );
                    } );
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

    onDimensionsChange = event => {
        this.setState( {
            portraitMode: (Dimensions.get("window").height > 500)? true: false
        } );
    };

    componentWillUnmount() {
        Dimensions.removeEventListener( "change", this.onDimensionsChange );

        BackHandler.removeEventListener( "hardwareBackPress" );
    }

    static navigatorStyle = {
        navBarBackgroundColor: DARK_BACKGROUND,
        navBarTextColor: DARK_TEXT_COLOR,
        statusBarColor: DARK_BACKGROUND
    };

    toggleTouchables() {
        this.setState( prevState => {
            return {
                touchablesDisabled: !prevState.touchablesDisabled
            }
        } );
    }

    enableTouchables() {
        this.setState( {
            touchablesDisabled: false
        } );
    }

    onChapterPress = ( chapter ) => {
        const validChapterPressHandler = chapterPressHandler.bind( this );
        validChapterPressHandler( chapter, this.toggleTouchables.bind( this ), this.dropDownAlert );
    };

    render() {
        const chapters = ["الفصل الأول", "الفصل الثاني", "الفصل الثالث", "الفصل الرابع", "الفصل الخامس"];
        const chaptersComponents = chapters.map( ( chapter, index ) => (
            <Chapter
              key = { index }
              style = { this.portraitMode? null: styles.landscapeChapter }
              index = { index }
              title = { chapter }
              onPress = { () => this.onChapterPress( "chapter" + (index + 1) ) }
              disabled = { this.state.touchablesDisabled }
            />
        ) );

        return(
            <DefalautScreenContainer>
                <ScrollView contentContainerStyle = { styles.container }>
                    <View style = { styles.listContainer }>
                    { chaptersComponents }
                    </View>
                </ScrollView>

                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                  closeInterval = { 2000 }
                />
            </DefalautScreenContainer>
        );
    }
}

export default ContentScreen;
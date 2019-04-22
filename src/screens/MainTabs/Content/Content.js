import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import DefalautScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import Chapter from '../../../components/Chapter/Chapter';
import chapterPressHandler from './chapterPressHandler';
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
            console.log( event );
            if ( event.id === "willAppear" ) {
                this.enableTouchables();
            } 
            else if ( event.id === "toggle_drawer_button" ) {
                this.props.navigator.toggleDrawer( {
                    side: "left"
                } );
            }
        } );

        Dimensions.addEventListener( "change", this.onDimensionsChange ); 
    }

    onDimensionsChange = event => {
        this.setState( {
            portraitMode: (Dimensions.get("window").height > 500)? true: false
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
        validChapterPressHandler( chapter, this.toggleTouchables.bind( this ) );
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
            </DefalautScreenContainer>
        );
    }
}

export default ContentScreen;
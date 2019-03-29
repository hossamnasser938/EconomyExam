import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import styles from './styles';
import chapterPressHandler from './chapterPressHandler';


class ContentScreen extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            touchablesDisabled: false
        };
        props.navigator.setOnNavigatorEvent( event => {
            if ( event.id === "willAppear" ) {
                this.enableTouchables();
            }
        } )
    }

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
        const chapters = ["chapter 1", "chapter 2", "chapter 3"];
        const chaptersComponents = chapters.map( ( chapter, index ) => (
            <View style = { styles.chapterContainer } key = { index }>
                <DefaultButton
                    title = { chapters[index] } 
                    onPress = { () => this.onChapterPress( chapters[index] ) }
                    disabled = { this.state.touchablesDisabled }
                />
            </View>
        ) );

        return(
            <ScrollView contentContainerStyle = { styles.container }>
                <View style = { styles.listContainer }>
                    { chaptersComponents }
                </View>
            </ScrollView>
        );
    }
}

export default ContentScreen;
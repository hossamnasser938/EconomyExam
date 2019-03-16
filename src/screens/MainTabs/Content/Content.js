import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Chapter from '../../../components/Chapter/Chapter';
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
        const chapters = ["chapter 1", "chapter 2", "chapter 3", "chapter 4", "chapter 5"];
        const chaptersComponents = chapters.map( ( chapter, index ) => (
            <TouchableOpacity 
                key = { index } 
                onPress = { () => this.onChapterPress( chapters[index] ) }
                disabled = { this.state.touchablesDisabled }    
            >
                <Chapter name = { chapter } />
            </TouchableOpacity> 
        ) );

        return(
            <View style = { styles.container }>
                <ScrollView style = { styles.listContainer }>
                    { chaptersComponents }
                </ScrollView>
            </View>
        );
    }
}

export default ContentScreen;
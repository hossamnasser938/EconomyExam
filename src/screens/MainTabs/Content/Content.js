import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Chapter from '../../../components/Chapter/Chapter';
import styles from './styles';
import getChapterQuestions from '../../../data/getChapterQuestions';
import Papa from 'papaparse';


class ContentScreen extends Component {
    onChapterPress = ( chapter ) => {
        console.log("get " + chapter, "questions");

        const chapterQuestionsPromise = getChapterQuestions( chapter );

        chapterQuestionsPromise.then( result => {
            console.log( "result: ", result );

            chapterQuestions = Papa.parse( result ).data;
            console.log( "content: got questions", chapterQuestions );

            this.props.navigator.push( {
                screen: "EconomyExam.ContentQuestionScreen",
                title: "Question",
                passProps: {
                    chapterQuestions
                }
            } );
        });
    };

    render() {
        const chapters = ["chapter 1", "chapter 2", "chapter 3", "chapter 4", "chapter 5"];
        const chaptersComponents = chapters.map( ( chapter, index ) => (
            <TouchableOpacity key = { index } onPress = { () => this.onChapterPress( chapters[index] ) }>
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
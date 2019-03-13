import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Chapter from '../../../components/Chapter/Chapter';
import styles from './styles';

class ContentScreen extends Component {
    onChapterPress = () => {
        this.props.navigator.push( {
            screen: "EconomyExam.QuestionScreen",
            title: "Question",
            passProps: {
                head: "إزي الحال",
                answers: ["زي الفل", "زي العسل", "تمام الحمد لله"],
                correctAnswerIndex: 2
            }
        } );
    };

    render() {
        const chapters = ["chapter 1", "chapter 2", "chapter 3", "chapter 4", "chapter 5"];
        const chaptersComponents = chapters.map( ( chapter, index ) => (
            <TouchableOpacity key = { index } onPress = { this.onChapterPress }>
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
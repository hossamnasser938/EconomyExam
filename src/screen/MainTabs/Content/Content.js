import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Chapter from '../../../components/Chapter/Chapter';
import styles from './styles'

class ContentScreen extends Component {
    render() {
        const chapters = ["chapter 1", "chapter 2", "chapter 3", "chapter 4", "chapter 5"];
        const chaptersComponents = chapters.map( ( chapter, index ) => (
            <Chapter key = { index } name = { chapter } />
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
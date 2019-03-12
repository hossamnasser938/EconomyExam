import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import styles from './styles';

class Question extends Component {
    render() {
        const answers = this.props.answers;
        const answersComponents = answers.map( ( answer, index ) => (
            <View key = { index } style = { styles.answerContainer }>
                <Text style = { styles.answerText }>{ answer }</Text>
            </View>
        ) );

        return(
            <View style = { styles.container }>
                <View style = { styles.questionHeadContainer }>
                    <Text style = { styles.questionHeadText }>{ this.props.head }</Text>
                </View>

                <ScrollView style = { styles.answersListContainer }>
                    { answersComponents }
                </ScrollView>

                <View style = { styles.nextButtonContainer }>
                    <Button 
                        style = { styles.nextButton }
                        title = "next"
                    />
                </View>
            </View>
        );
    }
}

export default Question;
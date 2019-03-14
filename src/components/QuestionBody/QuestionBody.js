import React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import styles from './styles';

const QuestionBody = ( props ) => (
    <View style = { styles.container }>
        <View style = { styles.questionHeadContainer }>
            <Text style = { styles.questionHeadText }>{ props.head }</Text>
        </View>

        <ScrollView style = { styles.answersListContainer }>
            { props.answersComponents }
        </ScrollView>

        <View style = { styles.buttonsContainer }>
            <Button
                title = "previous"
                onPress = { props.previousHandler }
            />

            <Text style = { styles.questionNumberText } >
                { props.currentQuestionNumber } / { props.totalQuestionsCount }
            </Text>

            <Button 
                title = "next"
                onPress = { props.nextHandler }
            />
        </View>
    </View>
);

export default QuestionBody;


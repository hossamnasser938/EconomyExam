import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
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
            <DefaultButton
                title = "previous"
                onPress = { props.previousHandler }
                disabled = { !props.previousEnabled }
            />

            <Text style = { styles.questionNumberText } >
                { props.currentQuestionNumber } / { props.totalQuestionsCount }
            </Text>

            <DefaultButton 
                title = "next"
                onPress = { props.nextHandler }
                disabled = { !props.nextEnabled }
            />
        </View>
    </View>
);

export default QuestionBody;


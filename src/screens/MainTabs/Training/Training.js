import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from './style';
import getAllQuestions from '../../../data/getAllQuestions';

class TrainingScreen extends Component {
    onStartTraining = () => {
        console.log("lets get questions together");
        getAllQuestions();
        /*
        this.props.navigator.push( {
            screen: "EconomyExam.TrainQuestionScreen",
            title: "Question",
            passProps: {
                questions: ["f", "ff"]
            }
        } );*/
    };
    
    render() {
        return(
            <View style = { styles.container }>
                <Button
                    style = { styles.startButton }
                    title = "Start Training"
                    onPress = { this.onStartTraining }
                />
            </View>
        );
    }
}

export default TrainingScreen;
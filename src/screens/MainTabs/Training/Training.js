import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from './style';

class TrainingScreen extends Component {
    onStartTraining = () => {
        this.props.navigator.push( {
            screen: "EconomyExam.TrainQuestionScreen",
            title: "Question",
            passProps: {
                head: "إزي الحال",
                answers: ["زي الفل", "زي العسل", "تمام الحمد لله"],
                correctAnswerIndex: 2
            }
        } );
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
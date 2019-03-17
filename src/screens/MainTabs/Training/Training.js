import React, { Component } from 'react';
import { View, Button } from 'react-native';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import styles from './style';
import startTrainingHandler from './startTrainingHandler';


class TrainingScreen extends Component {
    onStartTraining = () => {
        const validStartTrainingHandler = startTrainingHandler.bind( this );
        validStartTrainingHandler();
    };
    
    render() {
        return(
            <View style = { styles.container }>
                <DefaultButton
                    title = "Start Training"
                    onPress = { this.onStartTraining }
                />
            </View>
        );
    }
}

export default TrainingScreen;
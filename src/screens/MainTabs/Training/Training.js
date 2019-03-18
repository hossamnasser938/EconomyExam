import React, { Component } from 'react';
import { View } from 'react-native';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
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
                <View style = { styles.inputContainer }>
                    <DefaultInput
                    placeholder = "Enter Number of Questions"
                    keyboardType = "numeric"
                    />
                </View>
                <DefaultButton
                    title = "Start Training"
                    onPress = { this.onStartTraining }
                />
            </View>
        );
    }
}

export default TrainingScreen;
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const DefaultButton = props => (
    <TouchableOpacity
        onPress = { props.onPress }    
    >
        <View style = { styles.container }>
            <Text style = { styles.buttonTitle }>
                { props.title }
            </Text>
        </View>
    </TouchableOpacity>
);

export default DefaultButton;
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const DefaultButton = props => (
    <TouchableOpacity { ...props } >
        <View style = { [ styles.container, props.disabled? styles.disabled: styles.enabled ] }>
            <Text style = { styles.buttonTitle }>
            { props.title }
            </Text>
        </View>
    </TouchableOpacity>
);

export default DefaultButton;
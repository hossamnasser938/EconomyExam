import React from 'react';
import { View, Text, CheckBox } from 'react-native';
import styles from './styles';

const DefaultCheckBox = props => (
    <View style = { styles.container }>
        <CheckBox
            onValueChange = { props.onValueChange }
            value = { props.value }
        />
        <Text style = { styles.text }>
            { props.title }
        </Text>
    </View>
);

export default DefaultCheckBox;
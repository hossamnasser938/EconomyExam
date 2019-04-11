import React from 'react';
import { View, Text, CheckBox } from 'react-native';
import WrapperText from '../WrapperText/WrapperText';
import styles from './styles';

const DefaultCheckBox = props => (
    <View style = { styles.container }>
        <CheckBox
            onValueChange = { props.onValueChange }
            value = { props.value }
        />
        <WrapperText>
            <Text style = { styles.text }>
                { props.title }
            </Text>
        </WrapperText>
    </View>
);

export default DefaultCheckBox;
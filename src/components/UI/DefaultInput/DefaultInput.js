import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const DefaultInput = ( props ) => (
    <View style = { styles.wrapper }>
        <Icon name = "md-information-circle-outline" size = { 30 }/>
        <TextInput
            style = { styles.input }
            { ...props }
        />
    </View>
    
);

export default DefaultInput;
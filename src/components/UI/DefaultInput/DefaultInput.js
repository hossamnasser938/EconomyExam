import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const DefaultInput = ( props ) => (
    <View style = { styles.wrapper }>
        <Icon 
          name = { "md-" + props.iconName } 
          size = { props.size? props.size: 30 } 
          color = { props.color? props.color: null }
        />
        <TextInput
            style = { styles.input }
            placeholder = { props.placeholder }
            keyboardType = { props.keyboardType }
            onChangeText = { props.onChangeText }
        />
    </View>
    
);

export default DefaultInput;
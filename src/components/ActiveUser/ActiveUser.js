import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import WrapperText from '../UI/WrapperText/WrapperText';
import styles from './styles';

const ActiveUser = props => (
    <TouchableOpacity style = { styles.container } onPress = { props.onPress }>
        <Image 
          source = { require( "../../assets/user.png" ) }
        />

        <WrapperText style = { styles.text }>
            <Text>{ props.userName }</Text>
        </WrapperText>
    </TouchableOpacity>
);

export default ActiveUser;
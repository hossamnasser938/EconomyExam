import React from 'react';
import { View, Text, Image } from 'react-native';
import WrapperText from '../UI/WrapperText/WrapperText';
import styles from './styles';

const ActiveUser = props => (
    <View style = { styles.container }>
        <Image 
          source = { require( "../../assets/user.png" ) }
        />

        <WrapperText style = { styles.text }>
            <Text>{ props.userName }</Text>
        </WrapperText>
    </View>
);

export default ActiveUser;
import React from 'react';
import { View, Text, Image } from 'react-native';
import WrapperText from '../UI/WrapperText/WrapperText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const ActiveUser = props => {
    <View style = { styles.container }>
        <Image 
          source = { require( "../../assets/user.png" ) }
          style = { styles.image }
        />

        <WrapperText style = { styles.text }>
            <Text>{ props.userName }</Text>
        </WrapperText>

        <Icon 
          name = "circle"
          size = { 30 }
          color = "green"
        />
    </View>
};

export default ActiveUser;
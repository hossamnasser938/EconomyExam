import React from 'react';
import { View, Text, Image } from 'react-native';
import WrapperText from '../UI/WrapperText/WrapperText';
import styles from './styles';

const EmptyActiveUsersList = props => (
    <View style = { styles.container }>
        <Image 
          source = { require( "../../assets/no_active_users.png" ) }
          style = { styles.image }
        />

        <WrapperText style = { styles.text }>
            <Text>No Active Users</Text>
        </WrapperText>
    </View>
);

export default EmptyActiveUsersList;
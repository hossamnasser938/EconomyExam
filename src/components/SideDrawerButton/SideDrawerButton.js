import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DARK_TEXT_COLOR } from '../../utils/colors';
import styles from './styles';

const SideDrawerButton = props => (
    <TouchableOpacity onPress = { props.onPress }>
        <View style = { styles.container }>
            <Icon 
              name = { props.iconName }
              size = { 30 }
              color = { DARK_TEXT_COLOR }
            />

            <Text style = { styles.titleText }>
                { props.title }
            </Text>
        </View>
    </TouchableOpacity>
);

export default SideDrawerButton;
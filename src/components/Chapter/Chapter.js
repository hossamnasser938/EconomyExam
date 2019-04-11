import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import WrapperText from '../UI/WrapperText/WrapperText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DARK_TEXT_COLOR } from '../../utils/colors';
import styles from './styles';

const Chapter = props => (
    <View style = { [styles.outerContainer, props.style] }>
        <TouchableOpacity onPress = { props.onPress } disabled = { props.disabled } style = { styles.middleContainer }>
            <View style = { styles.innerContainer }>
                <Icon name = {"numeric-" + (props.index + 1) + "-box-outline"} size = { 30 } color = { DARK_TEXT_COLOR }/>
                <WrapperText>
                    <Text style = { styles.titleText }>
                        { props.title }
                    </Text>
                </WrapperText>
                <Icon name = "chevron-right" size = { 30 } color = { DARK_TEXT_COLOR }/>
            </View>
        </TouchableOpacity> 
    </View>  
);

export default Chapter;
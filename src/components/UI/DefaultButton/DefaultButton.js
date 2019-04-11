import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import WrapperText from '../WrapperText/WrapperText';
import styles from './styles';

const DefaultButton = props => (
    <TouchableOpacity { ...props } >
        <View style = { [ styles.container, props.disabled? styles.disabled: styles.enabled ] }>
            <WrapperText>
                <Text style = { styles.buttonTitle }>
                    { props.title }
                </Text>
            </WrapperText>
        </View>
    </TouchableOpacity>
);

export default DefaultButton;
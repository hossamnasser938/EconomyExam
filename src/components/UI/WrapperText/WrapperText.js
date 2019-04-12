import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const WrapperText = props => (
    <Text style = { [styles.default, props.style] }>
        { props.children }
    </Text>
);

export default WrapperText;
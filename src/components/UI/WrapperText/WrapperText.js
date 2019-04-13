import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const WrapperText = props => (
    <Text 
      { ...props }
      style = { [styles.default, props.style] }
    >
        { props.children }
    </Text>
);

export default WrapperText;
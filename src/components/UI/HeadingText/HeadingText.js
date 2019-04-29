import React from 'react';
import { Text } from 'react-native';
import WrapperText from '../WrapperText/WrapperText';
import styles from './styles';

const HeadingText = props => (
    <WrapperText style = { styles.headingText }>
        <Text>
            { props.children }
        </Text>
    </WrapperText>
);

export default HeadingText;
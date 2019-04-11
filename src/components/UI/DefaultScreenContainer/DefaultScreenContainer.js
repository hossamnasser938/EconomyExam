import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const DefaultScreenContainer = props => (
    <View { ...props } style = { [styles.container, props.style] }>
        { props.children }
    </View>
);

export default DefaultScreenContainer;
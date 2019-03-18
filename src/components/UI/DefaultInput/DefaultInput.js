import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

const DefaultInput = ( props ) => (
    <TextInput
    style = { styles.input }
    { ...props }
    />
);

export default DefaultInput;
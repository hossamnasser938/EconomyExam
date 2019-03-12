import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Chapter = ( props ) => (
    <View style = { styles.container }>
        <Text style = { styles.chapterName }>{ props.name }</Text>
    </View>
);

export default Chapter;
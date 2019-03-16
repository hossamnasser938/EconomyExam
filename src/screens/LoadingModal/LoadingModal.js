import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class LoadingModal extends Component {
    render() {
        console.log( "render loading modal" )
        return (
            <View style = { styles.container }>
                <Text style = { styles.loadingText }>Loading ...</Text>
            </View>
        );
    }
}

export default LoadingModal;
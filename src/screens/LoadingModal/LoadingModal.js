import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const loadingPatterns = [".", ". .", ". . ."];

var interval;

class LoadingModal extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            currentPattern: 0
        };
        interval = setInterval(
            () => {
                this.setState( prevState => {
                    return {
                        currentPattern: (prevState.currentPattern + 1) % 3
                    }
                } );
            },
            100            
        );
    }

    componentWillUnmount() {
        console.log( "componentWillUnmount" );
        clearInterval( interval );
    }

    render() {
        console.log( "render loading modal" )
        return (
            <View style = { styles.container }>
                <Text style = { styles.loadingText }>Loading { loadingPatterns[this.state.currentPattern] }</Text>
            </View>
        );
    }
}

export default LoadingModal;
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ContentScreen extends Component {
    render() {
        return(
            <View>
                <Text> Content Screen </Text>
                <Icon 
                  name="md-trash"
                  size = { 30 }
                />
            </View>
        );
    }
}

export default ContentScreen;
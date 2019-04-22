import React, { Component } from 'react';
import { View } from 'react-native';
import SideDrawerButton from '../../components/SideDrawerButton/SideDrawerButton';
import startAuthScreen from '../Authentication/startAuthScreen';
import styles from './styles';

export default class extends Component {
    render() {
        return(
            <View style = { styles.container }>
                <SideDrawerButton 
                  iconName = "account"
                  title = "Login"
                  onPress = { startAuthScreen }
                />

                <SideDrawerButton 
                  iconName = "account-question"
                  title = "Why Login"
                  onPress = { () => alert("not yet") }
                />
            </View>
        );
    }
}
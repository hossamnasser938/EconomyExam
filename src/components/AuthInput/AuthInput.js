import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LESS_DARK_TEXT_COLOR, DARK_TEXT_COLOR } from '../../utils/colors';
import styles from './styles';

export default class AuthInput extends Component {
    constructor( props ) {
      super( props );

      this.state = {
        toolTipVisible: false
      };

      this.key = null;
      this.hint = null;
      switch( props.placeholder ) {
        case "E-mail":
          this.key = "email";
          this.hint = "Enter a valid email e.g example@example.com";
          break;
        case "Name":
          this.key = "name";
          this.hint = "Enter a valid name that contains alphabets e.g Mohamed Ali";
          break;
        case "Password":
          this.key = "password";
          this.hint = "Enter a valid password of at least 6 characters";
          break;
        case "Confirm Password":
          this.key = "confirmPassword";
          this.hint = "repeat password";
          break;
      }
    }

  render() {  
    return(
      <View style = { [styles.container, this.props.style] }>
          <View style = { styles.iconWrapper }>
              <Icon
                name = { this.props.iconName }
                size = { 20 }
                color = { DARK_TEXT_COLOR }
              />
          </View>

          <View style = { styles.inputWrapper }>
              <TextInput 
                style = { styles.input }
                placeholder = { this.props.placeholder }
                placeholderTextColor = { LESS_DARK_TEXT_COLOR }
                keyboardType = { this.props.keyboardType }
                secureTextEntry = { this.props.secureTextEntry? this.props.secureTextEntry: false }
                value = { this.props.value }
                onChangeText = { newValue => this.props.updateInput( key, newValue ) }
              />

              <View style = { styles.checkMarkWrapper }>
                  <Tooltip
                    animated 
                    content = { <Text>{ this.hint }</Text> } 
                    placement = "top"
                    isVisible = { this.state.toolTipVisible }
                    onClose = { () => this.setState( { toolTipVisible: false } ) }
                  >
                    <TouchableOpacity 
                      onPress = { () => this.setState( { toolTipVisible: true } ) }>
                      <Icon
                        name = { this.props.valid? "check": "information-outline"}
                        size = { 20 }
                        color = { DARK_TEXT_COLOR }
                      />
                    </TouchableOpacity>
                  </Tooltip>
              </View>
          </View>
      </View>
    );
  }
};
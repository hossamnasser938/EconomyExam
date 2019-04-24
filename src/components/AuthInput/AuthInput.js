import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Tooltip from 'rn-tooltip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LESS_DARK_TEXT_COLOR, DARK_TEXT_COLOR } from '../../utils/colors';
import styles from './styles';

const AuthInput = props => {
  let key = null;
  let hint = null;

  switch( props.placeholder ) {
    case "E-mail":
      key = "email";
      hint = "Enter a valid email e.g example@example.com";
      break;
    case "Name":
      key = "name";
      hint = "Enter a valid name that contains alphabets e.g Mohamed Ali";
      break;
    case "Password":
      key = "password";
      hint = "Enter a valid password of at least 6 characters";
      break;
    case "Confirm Password":
      key = "confirmPassword";
      hint = "repeat password";
      break;
  }

  return(
    <View style = { [styles.container, props.style] }>
        <View style = { styles.iconWrapper }>
            <Icon
              name = { props.iconName }
              size = { 20 }
              color = { DARK_TEXT_COLOR }
            />
        </View>

        <View style = { styles.inputWrapper }>
            <TextInput 
              style = { styles.input }
              placeholder = { props.placeholder }
              placeholderTextColor = { LESS_DARK_TEXT_COLOR }
              keyboardType = { props.keyboardType }
              secureTextEntry = { props.secureTextEntry? props.secureTextEntry: false }
              value = { props.value }
              onChangeText = { newValue => props.updateInput( key, newValue ) }
            />

            <View style = { styles.checkMarkWrapper }>
                <Tooltip 
                  popover = { <Text style = { styles.toolTipText }>{ hint }</Text> } 
                  width = { 250 }
                >
                  <Icon
                    name = { props.valid? "check": "information-outline"}
                    size = { 20 }
                    color = { DARK_TEXT_COLOR }
                  />
                </Tooltip>
            </View>
        </View>
    </View>
  );
};

export default AuthInput;
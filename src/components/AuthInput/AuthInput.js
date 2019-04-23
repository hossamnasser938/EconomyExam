import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LESS_DARK_TEXT_COLOR, DARK_TEXT_COLOR } from '../../utils/colors';
import styles from './styles';

const AuthInput = props => {
  let key = null;
  switch( props.placeholder ) {
    case "E-mail":
      key = "email";
      break;
    case "Name":
      key = "name";
      break;
    case "Password":
      key = "password";
      break;
    case "Confirm Password":
      key = "confirmPassword";
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
        </View>
    </View>
  );
};

export default AuthInput;
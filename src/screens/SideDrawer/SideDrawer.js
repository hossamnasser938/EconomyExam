import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { authClearError, authClearSuccess, signOut } from '../../redux/actions/index';
import SideDrawerButton from '../../components/SideDrawerButton/SideDrawerButton';
import startAuthScreen from '../Authentication/startAuthScreen';
import styles from './styles';

class SideDrawer extends Component {
    whyLoginHandler = () => {
      this.dropDownAlert.alertWithType( 
        "info",
        "Why Login?",
        "You should be authenticated if you want to compete with others" 
      );
    };

    componentDidUpdate() {
      if ( this.props.success ) {
        this.dropDownAlert.alertWithType( "success", "Success", "Signed out successfully", null, 2000 );

        setTimeout( () => {
          this.props.navigator.toggleDrawer( {
            side: "left"
          } );
        }, 2500 );

        this.props.onClearSuccess();
      }

      if ( this.props.error ) {
        this.props.onClearError()
        this.dropDownAlert.alertWithType( "error", "Error", this.props.errorType, null, 2000 );
      }
    }

    render() {
        if ( firebase.auth().currentUser ) {
          return (
            <View style = { styles.container }>
                {
                  this.props.loading
                  ? <ActivityIndicator />
                  : <SideDrawerButton 
                      iconName = "logout"
                      title = "Logout"
                      onPress = { this.props.onSignOut }
                    />
                }

                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                />
            </View>
          );
        }
        else {
          return (
            <View style = { styles.container }>
                <SideDrawerButton 
                  iconName = "account"
                  title = "Login"
                  onPress = { startAuthScreen }
                />

                <SideDrawerButton 
                  iconName = "account-question"
                  title = "Why Login"
                  onPress = { this.whyLoginHandler }
                />

                <DropdownAlert 
                  ref = { ref => this.dropDownAlert = ref }
                />
            </View>
          );
        }
    }
}

const mapStateToProps = state => {
  return {
    success: state.auth.success,
    loading: state.auth.loading,
    error: state.auth.error,
    errorType: state.auth.errorType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch( signOut() ),
    onClearSuccess: () => dispatch( authClearSuccess() ),
    onClearError: () => dispatch( authClearError() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( SideDrawer );
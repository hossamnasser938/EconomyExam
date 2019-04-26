import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { updateReadyState } from '../../redux/actions/index';
import SideDrawerButton from '../../components/SideDrawerButton/SideDrawerButton';
import startAuthScreen from '../Authentication/startAuthScreen';
import styles from './styles';

class SideDrawer extends Component {
    signUserOut = () => {
      firebase.auth().signOut()
        .then( response => {
          this.dropDownAlert.alertWithType( "success", "Success", "Signed out successfully", null, 2000 );

          if ( this.props.isReady ) {
            this.props.onUpdateReadyState( false );
          }

          setTimeout( () => {
            // TODO: We need to close the drawer if it is open not togle it
            this.props.navigator.toggleDrawer( {
              side: "left"
            } );
          }, 2500 );
        } )
        .catch( error => {
          console.log( "Error signing out:", error );
          this.dropDownAlert.alertWithType( "error", "Error", "Failed signing out. Please, try again.", null, 2000 );
        } );
    };

    render() {
        if ( firebase.auth().currentUser ) {
          return (
            <View style = { styles.container }>
                <SideDrawerButton 
                  iconName = "logout"
                  title = "Logout"
                  onPress = { this.signUserOut }
                />

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
                  onPress = { () => alert("not yet") }
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
    isReady: state.compete.ready
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateReadyState: isReady => dispatch( updateReadyState( isReady ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( SideDrawer );
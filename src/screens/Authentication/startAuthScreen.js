import { Navigation } from 'react-native-navigation';

const startAuthScreen = () => {
    Navigation.startSingleScreenApp( {
        screen: {
            screen: "EconomyExam.AuthScreen",
            title: "Authentication",
            navigatorStyle: {
                navBarHidden: true
            }
        },
        animationType: "fade"
    } );
};

export default startAuthScreen;
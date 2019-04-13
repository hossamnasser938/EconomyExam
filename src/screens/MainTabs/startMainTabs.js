import { Navigation } from 'react-native-navigation';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';
/*
const startMainTabs = () => {
    Navigation.startTabBasedApp( {
        tabs: [
            {
                screen: "EconomyExam.ContentScreen",
                title: "Content",
                label: "Content",
                icon: require( "../../assets/study.png" )
            },
            {
                screen: "EconomyExam.TrainingScreen",
                title: "Training",
                label: "Training",
                icon: require( "../../assets/train.png" )
            },
            {
                screen: "EconomyExam.CompetitionScreen",
                title: "Competition",
                label: "Competition",
                icon: require( "../../assets/versus.png" )
            }
        ],
        appStyle: {
            tabBarSelectedButtonColor: DARK_TEXT_COLOR,
            tabBarBackgroundColor: DARK_BACKGROUND
        },
        animationType: "fade"
    } );
};*/

const startMainTabs = () => {
    Navigation.startSingleScreenApp( {
        screen: {
            screen: "EconomyExam.AuthScreen",
            title: "Authentication",
            navigatorStyle: {
                navBarHidden: true
            }
        }
    } );
};

export default startMainTabs;

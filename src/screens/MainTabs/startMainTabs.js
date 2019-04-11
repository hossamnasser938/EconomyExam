import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';

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
            }
        ],
        appStyle: {
            tabBarSelectedButtonColor: DARK_TEXT_COLOR,
            tabBarBackgroundColor: DARK_BACKGROUND
        },
        animationType: "fade"
    } );
};

export default startMainTabs;

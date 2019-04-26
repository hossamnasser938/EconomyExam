import { Navigation } from 'react-native-navigation';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';

const startMainTabs = ( initialTabIndex = 0 ) => {
    console.log( "initial tab = " + initialTabIndex );
    Navigation.startTabBasedApp( {
        tabs: [
            {
                screen: "EconomyExam.ContentScreen",
                title: "Content",
                label: "Content",
                icon: require( "../../assets/study.png" ),
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: require( "../../assets/menu.png" ),
                            title: "Menu",
                            id: "toggle_drawer_button"
                        }
                    ]
                }
            },
            {
                screen: "EconomyExam.TrainingScreen",
                title: "Training",
                label: "Training",
                icon: require( "../../assets/train.png" ),
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: require( "../../assets/menu.png" ),
                            title: "Menu",
                            id: "toggle_drawer_button"
                        }
                    ]
                }
            },
            {
                screen: "EconomyExam.CompetitionScreen",
                title: "Competition",
                label: "Competition",
                icon: require( "../../assets/versus.png" ),
                navigatorButtons: {
                    leftButtons: [
                        {
                            icon: require( "../../assets/menu.png" ),
                            title: "Menu",
                            id: "toggle_drawer_button"
                        }
                    ]
                }
            }
        ],
        drawer: {
            left: {
                screen: "EconomyExam.SideDrawerScreen"
            }
        },
        appStyle: {
            tabBarSelectedButtonColor: DARK_TEXT_COLOR,
            tabBarBackgroundColor: DARK_BACKGROUND,
            initialTabIndex
        },
        animationType: "fade"
    } );
};

export default startMainTabs;

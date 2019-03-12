import { Navigation } from 'react-native-navigation';
import { Icon } from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
    console.log( "Start Main Tabs" );
    Promise.all( [
        Icon.getImageSource("md-list", 30),
        Icon.getImageSource("md-book", 30)
    ] ).then( sources => {
        Navigation.startTabBasedApp( {
            tabs: [
                {
                    screen: "EngEconomics.ContentScreen",
                    title: "Content",
                    label: "Content",
                    icon: sources[0]
                },
                {
                    screen: "EngEconomics.LearningScreen",
                    title: "Training",
                    label: "Training",
                    icon: sources[1]
                }
            ] } 
        );
    } );
};

export default startMainTabs;
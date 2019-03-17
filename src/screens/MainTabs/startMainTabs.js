import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
    Promise.all( [
        Icon.getImageSource("md-list", 30),
        Icon.getImageSource("md-book", 30)
    ] ).then( sources => {
        Navigation.startTabBasedApp( {
            tabs: [
                {
                    screen: "EconomyExam.ContentScreen",
                    title: "Content",
                    label: "Content",
                    icon: sources[0]
                },
                {
                    screen: "EconomyExam.TrainingScreen",
                    title: "Training",
                    label: "Training",
                    icon: sources[1]
                }
            ],
            animationType: "none"
        } 
        );
    } );
};

export default startMainTabs;

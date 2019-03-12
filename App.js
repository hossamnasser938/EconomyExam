import { Navigation } from 'react-native-navigation';
import ContentScreen from './src/screen/MainTabs/Content';

//register screens
Navigation.registerComponent( "EconomyExam.ContentScreen", () => ContentScreen );

Navigation.startSingleScreenApp( {
    screen: {
        screen: "EconomyExam.ContentScreen",
        title: "Content"
    }
} )

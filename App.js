import { Navigation } from 'react-native-navigation';
import ContentScreen from './src/screen/MainTabs/Content/Content';
import LearningScreen from './src/screen/MainTabs/Learning/Learning';
import startMainTabs from './src/screen/MainTabs/startMainTabs';


//register screens
Navigation.registerComponent( "EconomyExam.ContentScreen", () => ContentScreen );
Navigation.registerComponent( "EconomyExam.LearningScreen", () => LearningScreen );


// start a tab-based app
startMainTabs();

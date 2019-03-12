import { Navigation } from 'react-native-navigation';
import ContentScreen from './src/screens/MainTabs/Content/Content';
import LearningScreen from './src/screens/MainTabs/Learning/Learning';
import QuestionScreen from './src/screens/Question/Question';
import startMainTabs from './src/screens/MainTabs/startMainTabs';


//register screens
Navigation.registerComponent( "EconomyExam.ContentScreen", () => ContentScreen );
Navigation.registerComponent( "EconomyExam.LearningScreen", () => LearningScreen );
Navigation.registerComponent( "EconomyExam.QuestionScreen", () => QuestionScreen );


// start a tab-based app
startMainTabs();

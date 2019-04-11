import { Navigation } from 'react-native-navigation';
import ContentScreen from './src/screens/MainTabs/Content/Content';
import TrainingScreen from './src/screens/MainTabs/Training/Training';
import ContentQuestionScreen from './src/screens/Question/ContentQuestion';
import TrainQuestionScreen from './src/screens/Question/TrainQuestion';
import CompetitionScreen from './src/screens/MainTabs/Competition/Competition';
import LoadingModalScreen from './src/screens/LoadingModal/LoadingModal';
import startMainTabs from './src/screens/MainTabs/startMainTabs';


//register screens
Navigation.registerComponent( "EconomyExam.ContentScreen", () => ContentScreen );
Navigation.registerComponent( "EconomyExam.TrainingScreen", () => TrainingScreen );
Navigation.registerComponent( "EconomyExam.ContentQuestionScreen", () => ContentQuestionScreen );
Navigation.registerComponent( "EconomyExam.TrainQuestionScreen", () => TrainQuestionScreen );
Navigation.registerComponent( "EconomyExam.LoadingModalScreen", () => LoadingModalScreen );
Navigation.registerComponent( "EconomyExam.CompetitionScreen", () =>  CompetitionScreen );


// start a tab-based app
startMainTabs();

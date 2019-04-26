import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Authentication/Authentication';
import ContentScreen from './src/screens/MainTabs/Content/Content';
import TrainingScreen from './src/screens/MainTabs/Training/Training';
import ContentQuestionScreen from './src/screens/Question/ContentQuestion';
import TrainQuestionScreen from './src/screens/Question/TrainQuestion';
import CompetitionScreen from './src/screens/MainTabs/Competition/Competition';
import LoadingModalScreen from './src/screens/LoadingModal/LoadingModal';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer';

import startMainTabs from './src/screens/MainTabs/startMainTabs';

import { Provider } from 'react-redux';
import configStore from './src/redux/configStore';

const appStore = configStore(); 

//register screens with redux
Navigation.registerComponent( "EconomyExam.AuthScreen", () => AuthScreen, appStore, Provider );
Navigation.registerComponent( "EconomyExam.CompetitionScreen", () =>  CompetitionScreen, appStore, Provider );

//register screens without redux
Navigation.registerComponent( "EconomyExam.ContentScreen", () => ContentScreen );
Navigation.registerComponent( "EconomyExam.TrainingScreen", () => TrainingScreen );
Navigation.registerComponent( "EconomyExam.ContentQuestionScreen", () => ContentQuestionScreen );
Navigation.registerComponent( "EconomyExam.TrainQuestionScreen", () => TrainQuestionScreen );
Navigation.registerComponent( "EconomyExam.LoadingModalScreen", () => LoadingModalScreen );
Navigation.registerComponent( "EconomyExam.SideDrawerScreen", () =>  SideDrawerScreen );

// start a tab-based app
startMainTabs();

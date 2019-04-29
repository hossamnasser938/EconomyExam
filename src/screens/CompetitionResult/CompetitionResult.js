import React from 'react';
import { View, Image } from 'react-native';
import DefaultScreenContainer from '../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import styles from './styles';

const CompetitionResult = props => {
    let text, imageSource;

    if ( props.myMark == props.oponentMark ) {
        text = "The Game ended in a tie";
        imageSource = require( "../../assets/balance.png" );
    }
    else if ( props.myMark > props.oponentMark ) {
        text = "Congratulations, You have beaten " + props.oponentName + " " + props.myMark + " - " + props.oponentMark;
        imageSource = require( "../../assets/winner.png" );
    }
    else {
        text = "Unfortunately, You have lost"; 
        imageSource = require( "../../assets/loser.png" );
    }

    return (
        <DefaultScreenContainer style = { styles }>
            <View style = { styles.wrapper }>
                <Image 
                  source = { imageSource }
                />
            </View>

            <View style = { styles.wrapper }>
                <HeadingText>
                    { text }
                </HeadingText>
            </View>
        </DefaultScreenContainer>
    );
};

export default CompetitionResult;
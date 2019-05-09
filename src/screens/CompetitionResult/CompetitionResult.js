import React, { Component } from 'react';
import { View, Image } from 'react-native';
import DefaultScreenContainer from '../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import styles from './styles';

export default class CompetitionResult extends Component {
    constructor( props ) {
        super( props );

        props.navigator.setOnNavigatorEvent( event => { 
            if ( event.id === "backPress" ) {
                props.navigator.dismissModal();
                props.popToRoot();
                return true;
            } 
        } );
    }

    render() {
        let text, imageSource;

        if ( this.props.myMark == this.props.oponentMark ) {
            text = "The Game ended in a tie";
            imageSource = require( "../../assets/balance.png" );
        }
        else if ( this.props.myMark > this.props.oponentMark ) {
            text = "Congratulations, You have beaten " + this.props.oponentName + " " + this.props.myMark + " - " + this.props.oponentMark;
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
    }
};
import React, { Component } from 'react';
import { View, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import styles from './styles';

class Question extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            answers: this.props.answers,
            head: this.props.head,
            correctAnswerIndex: this.props.correctAnswerIndex,
            pressedAnswerIndex: -1
        };
    }

    onAnswerPressed = ( key ) => {
        console.log( "Item pressed", key )
        this.setState( {
            pressedAnswerIndex: key
        } );
    }

    render() {
        const answers = this.state.answers;
        const answersComponents = answers.map( ( answer, index ) => {
            let itemStyles = [ styles.answerContainer ];
            if ( this.state.pressedAnswerIndex == index ) {
                if ( index == this.state.correctAnswerIndex ) {
                    itemStyles.push( styles.correctAnswerContainer );
                }
                else {
                    itemStyles.push( styles.wrongAnswerContainer );
                }
            } 

            return(
                <TouchableOpacity key = { index } onPress = { () => this.onAnswerPressed( index ) }>
                    <View style = { itemStyles }>
                        <Text style = { styles.answerText }>{ answer }</Text>
                    </View>
                </TouchableOpacity>
            );
        } );

        return(
            <View style = { styles.container }>
                <View style = { styles.questionHeadContainer }>
                    <Text style = { styles.questionHeadText }>{ this.state.head }</Text>
                </View>

                <ScrollView style = { styles.answersListContainer }>
                    { answersComponents }
                </ScrollView>

                <View style = { styles.nextButtonContainer }>
                    <Button 
                        style = { styles.nextButton }
                        title = "next"
                    />
                </View>
            </View>
        );
    }
}

export default Question;
import React, { Component } from 'react';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import styles from '../../components/QuestionBody/styles';

class TrainQuestion extends Component {
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
            <QuestionBody 
                head = { this.state.head }
                answersComponents = { answersComponents }
            />
        );
    }
}

export default TrainQuestion;
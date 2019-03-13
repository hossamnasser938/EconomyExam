import React, { Component } from 'react';
import QuestionBody from '../../components/QuestionBody/QuestionBody';
import styles from '../../components/QuestionBody/styles';

class ContentQuestion extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            answers: this.props.answers,
            head: this.props.head,
            correctAnswerIndex: this.props.correctAnswerIndex
        };
    }

    render() {
        const answers = this.state.answers;
        const answersComponents = answers.map( ( answer, index ) => {
            let itemStyles = [ styles.answerContainer ];
            if ( index == this.state.correctAnswerIndex ) {
                itemStyles.push( styles.correctAnswerContainer );
            }

            return(
                <View key = { index } style = { itemStyles }>
                    <Text style = { styles.answerText }>{ answer }</Text>
                </View>
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

export default ContentQuestion;
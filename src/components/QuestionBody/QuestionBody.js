import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import DefaultButton from '../UI/DefaultButton/DefaultButton';
import DefaultScreenContainer from '../UI/DefaultScreenContainer/DefaultScreenContainer';
import WrapperText from '../UI/WrapperText/WrapperText';
import styles from './styles';


class QuestionBody extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            portraitMode: (Dimensions.get("window").width < 500)? true: false
        }
        Dimensions.addEventListener( "change", this.onDimensionsChange );
    }

    onDimensionsChange = event => {
        this.setState( {
            portraitMode: (Dimensions.get("window").width < 500)? true: false
        } );
    };

    componentWillUnmount() {
        Dimensions.removeEventListener( "change", this.onDimensionsChange );
    }

    render() {
        const questionContainer = (
            <ScrollView style = { this.state.portraitMode? styles.questionHeadContainer: [styles.questionHeadContainer, styles.landscapeQuestionHeadContainer] }>
                <Text style = { styles.questionHeadText }>{ this.props.head }</Text>
            </ScrollView>
        );

        const answersContainer = (
            <ScrollView style = { styles.answersListContainer }>
                { this.props.answersComponents }
            </ScrollView>
        );

        const buttonsContainer = this.props.competition
            ? <View style = { this.state.portraitMode? [styles.buttonsContainer, styles.portraitButtonsContainer]: [styles.buttonsContainer] }>
                <WrapperText>
                    <Text style = { styles.questionNumberText }>
                        You { this.props.myMark } - { this.props.oponentMark } { this.props.oponentName }
                    </Text>
                </WrapperText>
                
                <WrapperText>
                    <Text style = { styles.questionNumberText } >
                            { this.props.currentQuestionNumber } / { this.props.totalQuestionsCount }
                    </Text>
                </WrapperText>
              </View>
            : (
                <View style = { this.state.portraitMode? [styles.buttonsContainer, styles.portraitButtonsContainer]: styles.buttonsContainer }>
                    <DefaultButton
                        title = "previous"
                        onPress = { this.props.previousHandler }
                        disabled = { !this.props.previousEnabled }
                    />

                    <Text style = { styles.questionNumberText } >
                        { this.props.currentQuestionNumber } / { this.props.totalQuestionsCount }
                    </Text>

                    <DefaultButton 
                        title = "next"
                        onPress = { this.props.nextHandler }
                        disabled = { !this.props.nextEnabled }
                    />
                </View>
              );

        let content;
        if ( this.state.portraitMode ) {
            content = (
                <DefaultScreenContainer style = { this.state.portraitMode? [styles.container, styles.portraitContainer]: [styles.container, styles.landscapeContainer] }>
                    { questionContainer }
                    { answersContainer }
                    { buttonsContainer }
                </DefaultScreenContainer>
            );
        } else {
            content = (
                <DefaultScreenContainer style = { this.state.portraitMode? [styles.container, styles.portraitContainer]: [styles.container, styles.landscapeContainer] }>
                    { answersContainer }
                    { questionContainer }
                    { buttonsContainer }
                </DefaultScreenContainer>
            );
        }

        return ( content );
    }    
}
export default QuestionBody;


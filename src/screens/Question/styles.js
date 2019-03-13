import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: "stretch"  
    },
    questionHeadContainer: {
        margin: 16,
        backgroundColor: "#987"
    },
    questionHeadText: {
        fontSize: 24,
        color: "white"
    },
    answersListContainer: {
        margin: 8
    },
    answerContainer: {
        backgroundColor: "white",
        margin: 8
    },
    correctAnswerContainer: {
        backgroundColor: "green"
    },
    wrongAnswerContainer: {
        backgroundColor: "red"
    },
    answerText: {
        fontSize: 18,
        color: "black"
    },
    nextButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 16
    },
    nextButton: {
         
    }
} );

export default styles;
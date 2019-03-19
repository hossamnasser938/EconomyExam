import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: "stretch"  
    },
    questionHeadContainer: {
        margin: 8,
        padding: 4,
        backgroundColor: "#BDBDBD",
        borderColor: "#123",
        borderWidth: 3,
        borderRadius: 10
    },
    questionHeadText: {
        color: "white",
        fontSize: 18
    },
    answersListContainer: {
        margin: 4
    },
    answerContainer: {
        backgroundColor: "white",
        margin: 4,
        padding: 4,
        borderColor: "#123",
        borderWidth: 2,
        borderRadius: 5
    },
    correctAnswerContainer: {
        backgroundColor: "green"
    },
    wrongAnswerContainer: {
        backgroundColor: "red"
    },
    answerText: {
        color: "black",
        fontSize: 14
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 8
    },
    questionNumberText: {
        fontSize: 18
    }
} );

export default styles;
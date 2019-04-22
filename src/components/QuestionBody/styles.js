import { StyleSheet } from 'react-native';
import { DARK_TEXT_COLOR, DARK_SEC_TEXT_COLOR, DARK_BACKGROUND } from '../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        flex: 1  
    },
    portraitContainer: {
        alignItems: "stretch" 
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    questionHeadContainer: {
        flex: 1,
        margin: 8,
        padding: 4
    },
    landscapeQuestionHeadContainer: {
        width: "33%"
    },
    questionHeadText: {
        color: DARK_TEXT_COLOR,
        fontSize: 18,
        fontWeight: "bold"
    },
    answersListContainer: {
        flex: 1,
        minHeight: 100,
        margin: 4
    },
    answerContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: DARK_TEXT_COLOR,
        minHeight: 40,
        margin: 4,
        padding: 4,
        borderWidth: 1,
        borderColor: DARK_BACKGROUND,
        borderRadius: 5
    },
    correctAnswerText: {
        color: "green"
    },
    wrongAnswerText: {
        color: "red"
    },
    answerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: DARK_SEC_TEXT_COLOR
    },
    answerTextWrapper: {
        maxWidth: "80%"
    },  
    buttonsContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        margin: 8
    },
    portraitButtonsContainer: {
        flexDirection: "row",
    },
    questionNumberText: {
        fontSize: 18,
        color: DARK_TEXT_COLOR
    }
} );

export default styles;
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
        backgroundColor: "#258",
        margin: 8
    },
    answerText: {
        fontSize: 18,
        color: "white"
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
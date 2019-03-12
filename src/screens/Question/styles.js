import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alighnItems: "stretch"  
    },
    questionHeadContainer: {
        margin: 16,
        backgroundColor: "#987"
    },
    questionHeadText: {
        fontSize: 24
    },
    answersListContainer: {
        margin: 8
    },
    answerContainer: {
        backgroundColor: "#654"
    },
    answerText: {
        fontSize: 18
    },
    nextButtonContainer: {
        flexDirection: "row",
        alighnItems: "flex-end"
    },
    nextButton: {
        margin: 8
    }
} );

export default styles;
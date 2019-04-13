import { StyleSheet } from 'react-native';
import { DARK_TEXT_COLOR } from '../../utils/colors';

const styles = StyleSheet.create( {
    mainTextWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    infoText: {
        color: DARK_TEXT_COLOR,
        fontSize: 14,
        textAlign: "center"
    },
    inputsWrapper: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    passwordInputssWrapperLandscape: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 20
    },
    passwordInputLandscape: {
        width: "45%"
    },
    buttonsWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btnWrapper: {
        width: "80%",
        marginTop: 10,
        marginBottom: 10
    },
    switchTextWrapper: {
        padding: 10,
        marginBottom: 10,
        width: "80%"
    },
    switchText: {
        textDecorationLine: "underline",
        textAlign: "center"
    }
} );

export default styles;
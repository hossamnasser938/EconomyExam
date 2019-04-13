import { StyleSheet } from 'react-native';
import { DARK_BACKGROUND, LESS_DARK_BACKGROUND, MORE_DARK_BACKGROUND } from '../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        flexDirection: "row",
        width: "80%",
        marginTop: 10
    },
    iconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: MORE_DARK_BACKGROUND,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: DARK_BACKGROUND
    },
    inputWrapper: {
        backgroundColor: LESS_DARK_BACKGROUND,
        flex: 1  ,
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: DARK_BACKGROUND
    },
    input: {
        width: "100%"
    }
} );

export default styles;
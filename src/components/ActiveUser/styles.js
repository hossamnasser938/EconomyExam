import { StyleSheet } from 'react-native';
import { LESS_DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: LESS_DARK_BACKGROUND,
        padding: 5,
        marginTop: 10,
        borderColor: LESS_DARK_BACKGROUND,
        borderWidth: 1,
        borderRadius: 5
    },
    text: {
        color: DARK_TEXT_COLOR,
        fontSize: 18,
        fontWeight: "bold"
    }
} );

export default styles;
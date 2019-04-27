import { StyleSheet } from 'react-native';
import { LESS_DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: LESS_DARK_BACKGROUND,
        width: "100%",
        padding: 5,
        margin: 5
    },
    image: {
        width: 64,
        height: 64
    },
    text: {
        color: DARK_TEXT_COLOR,
        fontSize: 18,
        fontWeight: "bold"
    }
} );

export default styles;
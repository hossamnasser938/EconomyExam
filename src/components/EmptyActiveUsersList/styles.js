import { StyleSheet } from 'react-native';
import { LESS_DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 128,
        height: 128
    },
    text: {
        color: DARK_TEXT_COLOR,
        fontSize: 18,
        fontWeight: "bold",
        margin: 10
    }
} );

export default styles;
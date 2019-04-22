import { StyleSheet } from 'react-native';
import { DARK_TEXT_COLOR, LESS_DARK_BACKGROUND, DARK_BACKGROUND } from '../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: LESS_DARK_BACKGROUND,
        borderWidth: 1,
        borderColor: DARK_BACKGROUND,
        borderRadius: 5
    },
    titleText: {
        color: DARK_TEXT_COLOR,
        fontWeight: "bold",
        fontSize: 18
    }
} );

export default styles;
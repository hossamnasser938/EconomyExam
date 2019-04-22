import { StyleSheet } from 'react-native';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';

const styles = StyleSheet.create( {
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: DARK_TEXT_COLOR,
        borderColor: DARK_BACKGROUND,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    input: {
        width: "100%",
        paddingBottom: 5
    }
} );

export default styles;
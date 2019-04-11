import { StyleSheet } from 'react-native';
import { LESS_DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        alignItems: "center",
        padding: 5,
        backgroundColor: LESS_DARK_BACKGROUND,
        borderColor: DARK_TEXT_COLOR,
        borderWidth: 1,
        borderRadius: 5
    },
    buttonTitle: {
        fontSize: 18,
        textTransform: "uppercase"
    },
    enabled: {
        opacity: 1
    },
    disabled: {
        opacity: 0.3
    }
} );

export default styles;
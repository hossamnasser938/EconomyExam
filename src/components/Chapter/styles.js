import { StyleSheet } from 'react-native';
import { LESS_DARK_BACKGROUND }  from '../../utils/colors';

const styles = StyleSheet.create( {
    outerContainer: {
        flex: 1,
        backgroundColor: LESS_DARK_BACKGROUND,
        margin: 10,
        borderRadius: 5
    },
    middleContainer: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    titleText: {
        fontSize: 22
    }
} );

export default styles;
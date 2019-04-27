import { StyleSheet } from 'react-native';
import { DARK_TEXT_COLOR } from '../../../utils/colors';

const styles = StyleSheet.create({
    container: { 
        alignItems: "center",
        justifyContent: "center" 
    },
    listContainer: {
        flexGrow: 1,
        width: "80%"
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },  
    imageWrapper: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    restWrapper: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    wrapper: {
        margin: 16,
        justifyContent: "center",
        alignItems: "stretch",
        width: "80%"
    },
    btnWrapper: {
        margin: 10
    },
    mainText: {
        textAlign: "center"
    },
    emptyListText: {
        color: DARK_TEXT_COLOR,
        textAlign: "center"
    }
} );

export default styles;
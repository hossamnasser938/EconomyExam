import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    outerContainer: {
        flexGrow: 1
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fieldContainer: {
        width: "80%",
        marginTop: 8,
        marginBottom: 8
    },
    errorText: {
        color: "red"
    }
} );

export default styles;
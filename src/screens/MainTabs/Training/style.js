import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    outerContainer: {
        flex: 3
    },
    scrollContainer: {
        flexGrow: 1
    },
    fieldContainer: {
        width: "80%",
        marginTop: 8,
        marginBottom: 8
    },
    infoText: {
        textAlign: "justify"
    },
    errorText: {
        color: "red"
    },
    wrapper: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    }
} );

export default styles;
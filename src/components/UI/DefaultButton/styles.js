import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    container: {
        alignItems: "center",
        padding: 5,
        backgroundColor: "#123",
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 5
    },
    buttonTitle: {
        fontSize: 18,
        color: "white"
    },
    enabled: {
        opacity: 1
    },
    disabled: {
        opacity: 0.3
    }
} );

export default styles;
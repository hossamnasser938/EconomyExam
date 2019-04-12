import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    }
} );

export default styles;
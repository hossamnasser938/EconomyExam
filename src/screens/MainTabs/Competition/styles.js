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
    btnWrapper: {
        margin: 10
    }
} );

export default styles;
import { StyleSheet, Dimensions } from 'react-native';
import { DARK_TEXT_COLOR, DARK_BACKGROUND } from '../../utils/colors';

const styles = StyleSheet.create( {
    container: {
        height: "100%",
        width: Dimensions.get( "window" ).width * 0.8,
        backgroundColor: DARK_BACKGROUND
    }    
} );

export default styles;
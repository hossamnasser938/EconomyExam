import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import DefaultScreenContainer from '../../../components/UI/DefaultScreenContainer/DefaultScreenContainer';
import WrapperText from '../../../components/UI/WrapperText/WrapperText';
import DefaultButton from '../../../components/UI/DefaultButton/DefaultButton';
import { DARK_BACKGROUND, DARK_TEXT_COLOR } from '../../../utils/colors';
import styles from './styles';

export default class Competition extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            portrait: Dimensions.get( "window" ).height > 500? true: false
        }

        Dimensions.addEventListener( "change", this.onDimensionsChange );
    }

    onDimensionsChange = () => {
        this.setState( {
            portrait: Dimensions.get( "window" ).height > 500? true: false
        } )
    };

    componentWillUnmount() {
        Dimensions.removeEventListener( "change", this.onDimensionsChange );
    }

    static navigatorStyle = {
        navBarBackgroundColor: DARK_BACKGROUND,
        navBarTextColor: DARK_TEXT_COLOR, 
        statusBarColor: DARK_BACKGROUND
    };

    render() {
        return(
            <DefaultScreenContainer style = { this.state.portrait? styles.portraitContainer: styles.landscapeContainer }>
                <View style = { styles.imageWrapper }>
                    <Image source = { require( "../../../assets/ready.png" ) }/>
                </View>
                <View style = { styles.restWrapper }>
                    <WrapperText>
                        <Text>
                            Are you ready to compete with others?
                        </Text>
                    </WrapperText>
                    <DefaultButton
                      style = { styles.btnWrapper } 
                      title = "I am Ready"
                    />
                </View>
            </DefaultScreenContainer>
        );
    }
}
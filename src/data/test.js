import RNFS from 'react-native-fs';
import Papa from 'papaparse';

const test = () => {

    console.log( "test assets folder" );
    
    RNFS.readFileAssets('test.csv').then( result => {
        data = Papa.parse( result );

        console.log( data );
    })
};

export default test;
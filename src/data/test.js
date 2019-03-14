import Papa from 'papaparse';
import file from './data.csv';

const test = () => {
    console.log( "start parsing" );
    
    Papa.parse( file, {
        download: true,
        delimeter: "\t",
        complete: result => {
            console.log( "result:", result.data );
        }
    });
};

export default test;
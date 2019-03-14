import RNFS from 'react-native-fs';

const getAllQuestions = () => {
    RNFS.readDirAssets("chapters")
    .then(results => {
        console.log( "result:", results );
        const files = results.map( result => result.name );
        const promises = files.map( file => RNFS.readFileAssets('chapters/' + file) );
        return Promise.all( promises );
    } )
    .then(contents => {
        console.log( "contents:", contents )
    })
    .catch( reason => {
        console.log( "error due to:", reason );  
    });
};

export default getAllQuestions;
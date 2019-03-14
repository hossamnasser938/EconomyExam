import RNFS from 'react-native-fs';

const getAllQuestions = () => {
    RNFS.readDirAssets("chapters")
    .then(result => {
        console.log( "result:", result );
    }).catch( reason => {
        console.log( "error due to:", reason );  
    })
};

export default getAllQuestions;
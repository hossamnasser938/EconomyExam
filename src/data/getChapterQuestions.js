import RNFS from 'react-native-fs';

const getChapterQuestions = ( chapter ) => {
    const fileName = chapter + '.csv';
    const fNWithNoSpaces = fileName.replace(" ", "");
    console.log( "filename", fNWithNoSpaces );

    return RNFS.readFileAssets( "chapters/" + fNWithNoSpaces );
};

export default getChapterQuestions;
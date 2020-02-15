import RNFS from "react-native-fs";

const getAllQuestions = () => {
  return RNFS.readDirAssets("chapters");
};

export default getAllQuestions;

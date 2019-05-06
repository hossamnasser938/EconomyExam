# EconomyExam

## Table of Contents
* [Overview](#Overview)
* [V1 Challenges](#V1_Challenge)
* [V1 Features](#V1_Features)
* [V1 Tools](#V1_Tools)
* [V2 Challenges](#V1_Challenge)
* [V2 Features](#V1_Features)
* [V2 Tools](#V1_Tools)
* [Release](#Release)
* [Screenshots](#Screenshots)

## Overview
**EconomyExam** is an **Android** mobile application built using ` React Native `. **EcomomyExam** is an application that aims to train students on the questions of "Engineering Economy" subject. By students I mean 4th-year students of the faculty of electronic engineering in computer science and engineering depatment _ the 50th batch. 

## V1 Challenges
* On building V1, there was only one challenge: How to represent the questions in a way that the application can deal with? To understand the problem well, we have this sample of questions stored in a word file and we need to provide it in an accessible way for the application.

```
1/ خلال شهر يناير من كل عام على صاحب العمل أن يرسل إلى الجهة الإدارية المختصة التي يقع في دائرتها محل العمل:
 - ما طرأ من تعديلات على بيانات العمل.
 - عدد الوظائف الجديدة.
 - بيان بتقدير الاحتياجات المتوقعة.
 - كل ما سبق. ✔️

2/ يجب على صاحب العمل استخدام المكاتب الاستشارية في تشغبل عمال ولا يجوز له استخدام مقاول توريد عمال في ذلك.
 - عبارة صحيحة. ✔️
 - عبارة خاطئة.

3/ تكون مزاولة عمليات إلحاق المصريين بالعمل في الخارج أو الداخل عن طريق:
 - الوزارات المختصة.
 - الاتحاد العام لنقابات عمال مصر.
 - النقابات المهنية بالنسبة لأعضائها فقط.
 - كل ما سبق. ✔️

4/ يجوز للشركات تقاضي مبلغ لا يجاوز 20% من أجر العامل وذلك عن السنة اﻷولى فقط كمصروفات إدارية.
 - عبارة صحيحة.
 - عبارة خاطئة. ✔️
```

* To be honest not all files have this strict structure but with some effort we can reach with all files to this structure. For the first glance I realized that I can write a ` NodeJS ` script that parses this file into a structured csv file with each tuple consisting of:
    * The first column represents the question header.
    * A variable number of answers each in a separate column.
    * The last column allocated to the index of the correct choice.

* For example the previous sample of files is converted to this form.
```
خلال شهر يناير من كل عام على صاحب العمل أن يرسل إلى الجهة الإدارية المختصة التي يقع في دائرتها محل العمل:,ما طرأ من تعديلات على بيانات العمل.,عدد الوظائف الجديدة.,بيان بتقدير الاحتياجات المتوقعة.,"كل ما سبق. ",4
يجب على صاحب العمل استخدام المكاتب الاستشارية في تشغبل عمال ولا يجوز له استخدام مقاول توريد عمال في ذلك.,"عبارة صحيحة. ",عبارة خاطئة.,1
تكون مزاولة عمليات إلحاق المصريين بالعمل في الخارج أو الداخل عن طريق:,الوزارات المختصة.,الاتحاد العام لنقابات عمال مصر.,النقابات المهنية بالنسبة لأعضائها فقط.,"كل ما سبق. ",4
يجوز للشركات تقاضي مبلغ لا يجاوز 20% من أجر العامل وذلك عن السنة اﻷولى فقط كمصروفات إدارية.,عبارة صحيحة.,"عبارة خاطئة. ",2
```

* Using ` papaparse ` **package** I could read the file into a string and with some logic I could convert it into a csv file. Here is the script I wrote.
```js
const fs = require("fs");
const path = require("path");
const papa = require("papaparse");

/*
Read txt file
*/
const content = fs.readFileSync( 
    path.join( __dirname, "questions_page48_49.txt" ), 
    { encoding: "utf8" } );

/*
Convert the file into array of characters
*/
const contentAsArray = [...content];

/* 
Get the indices of the characters where questions start
*/
let questionsStartIndices = [];   

contentAsArray.forEach( ( value, index ) => {
    if ( value == "/" ) {
        questionsStartIndices.push( index + 2 );
    }
} );


/* 
separate questions: each question is a string that includes quetsion header, answers, and correct answer index
*/
let questions = []; 
for ( let i = 0; i < questionsStartIndices.length; i++ ) {
    let nextQuestion;
    if ( questionsStartIndices[i + 1] ) {
        nextQuestion = content.substring( 
            questionsStartIndices[i], 
            questionsStartIndices[i + 1] - 5 );
    }
    else {
        nextQuestion = content.substring( questionsStartIndices[i], content.length - 1 );
    }

    questions.push( nextQuestion )
}

/*
Convert each question into an array of: question header, question answers, and correct answer index
*/
const questionsForCSV = questions.map( question => {
    let questionForCSV = [];

    let startIndex = 0;
    while ( true ) {
        let nextIndex = question.indexOf("-", startIndex);
        if ( nextIndex == -1 ) {
            questionForCSV.push( question.substring( startIndex ) );
            break;
        }

        questionForCSV.push( question.substring( startIndex, nextIndex ) );
        startIndex = nextIndex + 1;
    }

    const pureQuestionForCSV = questionForCSV.map( (field) => field.trim() );

    pureQuestionForCSV.forEach( ( field, index ) => {
        const rightCheckIndex = field.indexOf( "✔️" );
        if ( rightCheckIndex !== -1 ) {
            pureQuestionForCSV.push( index );
            pureQuestionForCSV[index] = pureQuestionForCSV[index].slice(0, -2);
        }
    } );

    return pureQuestionForCSV;
} );

/*
write these questions into a csv file
*/
const csvFileContent = papa.unparse( questionsForCSV );
fs.writeFileSync( path.join( __dirname, "data.csv" ), csvFileContent );
```

* By that I can convert each file into this accessible csv file that the application can deal with[will be mentioned how in the tools section].

## V1 Features
Version 1 provides only the basic and most necessary features to fullfil the goal which the application was built for.
  * The student can go through the questions of a specific chapter. In this step the questions appear answered with no or little interaction.
  * After the student becomes familiar with the questions, he/she can start training on a random sample of the questions. He/She can specify the number of the questions sample or simply choose to train on all questions. In this step the questions appear to the user not answered waiting for him to choose. On choosing, the application gives a visual feedback reflecting whether the student choice was correct or not.

## V1 Tools
* Since version 1 does not include more than the basic features, I used only 2 packages in the application.
    * [` react-native-navigation `](https://www.npmjs.com/package/react-native-navigation)  
This *native* package provided by **Wix** gives the app a native way of navigating between tabs. This package is well-known for its high performance since it provides a *native* navigation solution.
    * [` react-native-vector-icons `](https://www.npmjs.com/package/react-native-vector-icons)  
This package provides great icons for your application to let you provide an acceptable user interface for the users. I used this package to ` render ` icons for the main tabs[can be shown in the screenshots section].
    * [` react-native-fs `](https://www.npmjs.com/package/react-native-fs)  
This package allows accessing files in the app storage. I used it to access the csv files after locating them in the "android/app/src/main/assets" directory.

## V2 Challenges
* The main challenge in V2 was to:
    * restyle the app in a reusable way. To acheive that I designed reusable **UI** components like ` DefaultButton `, ` DefaultInput `, etc that can be reused over the entire app.
    * provide a way to let users communicate over the network to compete each others. This motivates students to train more and more on questions. To acheive that I used **firebase** services to authenticate users and let them communicate by writting to a realtime database. 

## V2 Features
* In V2 I provided 3 new features:
    * Enhancing the application **UI**. All screens were restyled to give a better user interface.
    * Adding a Splash Screen.
    * Playing sounds when the user hits a choice to reflect whether the choice is correct or not. This provides a better user experience and makes the application alive.
    * Letting 2 users compete each others by specifying a number of questions to compete on and then each user takes turn to answer, counting correct and incorrect answers and finally displaying the state whether a winner, a loser or a tie. To acheive this feature, I had to add Authentication screen to let users write and read to firebase realtime database securely.

## V2 Tools
* In V2 I used 9 more **packages**:
    * [` react-native-firebase `](https://www.npmjs.com/package/react-native-firebase)  
    A **package** that wraps *native* firebase **SDK** for both **Android** and **IOS** to provide a stable ` JavaScript ` shell out of these native **SDK**. It supports most of firebase services. For this app I used only **Authentication** and **Realtime Database**. 
    * [` redux `](https://www.npmjs.com/package/redux)  
    A great standalone tool to manage **state change** and decreases **components coupling**. 
    * [` react-redux `](https://www.npmjs.com/package/react-redux)  
    Since ` redux ` is a standalone tool that is not dedicated to **React Native**, we need another package to hook it within a **React Native** app and here ` react-redux ` comes to the scene.  
    * [` redux-thunk `](https://www.npmjs.com/package/redux-thunk)  
    A ` redux ` **middleware** that facilitates handling **asynchronous** actions.
    * [` react-native-sound `](https://www.npmjs.com/package/react-native-sound)  
    A package that is used to play, pause, and stop audio sounds. I used it to play sounds when the user hits a choice to reflect whether his choice is correct or not.
    * [` react-native-material-dialog `](https://www.npmjs.com/package/react-native-material-dialog)  
    A package that is used to show a customized dialog. I used it to establish the handshaking between 2 users initiating a competition over the network. 
    * [` react-native-dropdownalert `](https://www.npmjs.com/package/react-native-dropdownalert)  
    A package that is used to provide **animated** alerts that come from the most top and disappears after a specified closing interval. It provides a good user experience.
    * [` rn-tooltip `](https://www.npmjs.com/package/rn-tooltip)  
    A package that provides a way to tell the user what he/she should do. I used it to tell the user what he/she should enters in the Authenticstion screen.
    * [` uuid-v4 `](https://www.npmjs.com/package/uuid)   
    A package that is used to to generate **unique** ids. I used it to generate unique ids for sessions between 2 users in the competition as well as ids for answers.

## Release
The application has been released to the Google App Store and can be found [here](https://play.google.com/store/apps/details?id=com.economyexam&fbclid=IwAR24AhV3ZE2qCE3-pfbh1rvcgARJydKqoxLPFHXBXZwTY71XnI4sFW1ty2Q).

## ScreenShots
* Content Tab<br />
![Content Tab](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/1.png)
* Training Tab Responsive Design<br />
![Training Tab Responsive Design](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/2.gif)
* Competetion Tab Responsive Design<br />
![Competetion Tab Responsive Design](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/3.gif)
* Question Responsive Design<br />
![Question Responsive Design](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/4.gif)
* Question Correct Answer<br />
![Question Correct Answer](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/5.gif)
* Question Incorrect Answer<br />
![Question Incorrect Answer](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/6.gif)
* Authentication Login Design<br />
![Authentication Login Design](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/7.png)
* Authentication SignUp Responsive Design<br />
![Authentication SignUp Responsive Design](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/8.gif)
* Splash Screen<br />
![Splash Screen](https://github.com/hossamnasser938/EconomyExam/blob/v2/screenshots/9.png)
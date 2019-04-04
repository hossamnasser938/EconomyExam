# EconomyExam

## Table of Contents
* [Overview](#Overview)
* [V1 Features](#V1_Features)
* [V1 Challenge](#V1_Challenge)
* [V1 Tools](#V1_Tools)
* [Release](#Release)
* [V1 Screenshots](#V1_Screenshots)

## Overview
**EconomyExam** is a **cross-platform** mobile application built using ` React Native `. **EcomomyExam** is an application that aims to train students on the questions of "Engineering Economy" subject. By students I mean 4th-year students of the faculty of electronic engineering in computer science and engineering depatment _ the 50th batch. 

## V1 Features
Version 1 provides only the baasic and most necessary features to fullfil the goal which the application was built for.
    1. The student can go through the questions of a specific chapter. In this step the questions appear answered no or little interaction.
    2. After the student becomes familiar with the questions, he/she can start training on a random sample of the questions. He/She can specify the number of the questions sample or simply choose to train on all questions. In this step the questions appear to the user not answered waiting for him to choose. On choosing the application gives a visual feedback reflecting whether the student choice was right or wrong.

## V1 Challenge
* On building V1, there was only one challenge. How to represent the questions in a way that the application can deal with? To understand the problem well, we have this sample of questions stored in a word file and we need to provide it in an accessible way for the application.

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

* To be honest not all files have this strict structure but with some manual effort we can reach with all files to this structure. For the first glance I realized that I can write a ` NodeJS ` script that parses this file into a structured csv file with each tuple consisting of:
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

* Using ` papaparse ` package I could read the file into a string and with some logic I could convert it into a csv file. Here is the script I wrote.
```js
const fs = require("fs");
const path = require("path");
const papa = require("papaparse");


const content = fs.readFileSync( 
    path.join( __dirname, "questions_page48_49.txt" ), 
    { encoding: "utf8" } );

const contentAsArray = [...content];


let questionsStartIndices = [];   

contentAsArray.forEach( ( value, index ) => {
    if ( value == "/" ) {
        questionsStartIndices.push( index + 2 );
    }
} );


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


const csvFileContent = papa.unparse( questionsForCSV );
fs.writeFileSync( path.join( __dirname, "data.csv" ), csvFileContent );
```

* By that I can convert each file into this accessible csv file that the application can deal with[will be mentioned how in the tools section].

## V1 Tools
* Since version 1 does not include more than the basic features, I used only 2 packages in the application.
    * ` react-native-avigation `  
This *native* package provided by **Wix** gives the app a native way of navigating between tabs. This package is well-known for its high performance since it provides a *native* navigation solution.
    * ` react-native-vector-icons `  
This package provides great icons for your application to let you provide an acceptable user interface for the users. I used this package to ` render ` icons for the main tabs[can be shown in the screenshots section].
    * ` react-native-fs `  
This package allows accessing files in the app storage. I used it to access the csv files after locating them in the "android/app/src/main/assets" directory.

## Release
The application has been released to the Google App Store and can be found [here](https://play.google.com/store/apps/details?id=com.economyexam&fbclid=IwAR24AhV3ZE2qCE3-pfbh1rvcgARJydKqoxLPFHXBXZwTY71XnI4sFW1ty2Q).

## ScreenShots
* Content Tab<br />
![Content Tab](https://github.com/hossamnasser938/EconomyExam/blob/master/screenshots/1.png)
* Training Tab<br />
![Training Tab](https://github.com/hossamnasser938/EconomyExam/blob/master/screenshots/2.png)
* Content Question | Training Question Correct Answer<br />
![Content Question](https://github.com/hossamnasser938/EconomyExam/blob/master/screenshots/3.png)
* Training Question Wrong Answer<br />
![Training Question Wrong Answer](https://github.com/hossamnasser938/EconomyExam/blob/master/screenshots/4.png)
* Question Responsive Design<br />
![Question Responsive Design](https://github.com/hossamnasser938/EconomyExam/blob/master/screenshots/5.gif)

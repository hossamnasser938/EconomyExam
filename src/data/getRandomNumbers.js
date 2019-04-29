const getRandomNumbers = ( max, min, count ) => {
    let numbers = new Array( count );
    
    for ( let i = 0; i < count; i++ ) {
        numbers[i] = getRandomNumber( max, min );
    }

    return numbers;
};

const getRandomNumber = ( max, min ) => {
    return  Math.trunc( Math.random() * ( max - min ) ) + min;
};

export default getRandomNumbers;
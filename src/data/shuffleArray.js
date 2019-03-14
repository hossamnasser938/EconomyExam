const shuffle = ( array ) => {
    let i = array.length;
    if ( i == 0 ) {
        return array;
    }

    const newArray = [ ...array ];

    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        [ newArray[i], newArray[j] ] = [ newArray[j], newArray[i] ];
    }

    return newArray;
}

export default shuffle;
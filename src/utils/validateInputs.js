
const validateInputs = ( input, rules, connectedValues ) => {
    console.log( "input:", input );
    console.log( "c v:", connectedValues );
    console.log( "rules:", rules );
    
    let valid = true;
    
    for ( rule in rules ) {
        console.log( "rule:", rule );
        switch( rule ) {
            case "isEmail":
                valid = valid && validateIsEmail( input );
                break;
            case "isName":
                valid = valid && validateIsName( input );
                break;
            case "minLength":
                valid = valid && validateMinLength( input, rules[rule] );
                break;
            case "isEqualTo":
                valid = valid && validateIsEqualTo( input, connectedValues[rules[rule]] );
                break;
        }
    }

    return valid;
};

const validateIsEmail = email => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test( email );
};

const validateIsName = name => {
    const containsAlphabetsRegex = /[a-zA-Z]/;
    return name !== "" && containsAlphabetsRegex.test( name );
};

const validateMinLength = ( value, minLength ) => {
    return value.length >= minLength;
};

const validateIsEqualTo = ( value, checkValue ) => {
    console.log( "value:", value );
    console.log( "check value:", checkValue );
    return value === checkValue;
}

export default validateInputs;
// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Creating a validity checker based on Luhn algorithm:

const validateCred = cardNumber => {
    const checkDigit = cardNumber[cardNumber.length - 1]; // storing check digit for final sum

    const newValid = cardNumber.map((number, index) => {
        // if length is even than every even index number must be multiplied by two otherwise the odd index numbers must be multiplied 
        if(cardNumber.length % 2 === 0){
            if(index % 2 === 0){
                return number * 2;
    
            } else{
                return number;
            };
        } else {
            if(index % 2 !== 0){
                return number * 2;
    
            } else{
                return number;
            };

        }
        

    });

    // checking if there are any numbers greater than 9 at the new array, if there is subtract 9 from it 
    const adjValid = newValid.map(number => {
        if(number > 9){
            return number - 9;
        } else{
            return number;
        }
    })

    
    // removing the last digit (checker) from result array
    adjValid.splice(-1, 1);
    
    // sum up all numbers in the result array and adding it to checker digit, finally making the final verification using if mod 10 iguals 0
    let sumUp = adjValid.reduce((accumulator, currentValue) =>{
        return accumulator + currentValue;
    })
    sumUp += checkDigit;
    if(sumUp % 10 === 0){
        return true
    } else{
        return false
    }

}


// running validateCred function to push all false results to a new invalidCards array to be returned
const findInvalidCards = list =>{
    let invalidCards = []
    for(card of list){
        if(validateCred(card) === false){
            invalidCards.push(card);
            
        }

    };
    return invalidCards;

};

// applying the function to ger a new array with only invalid cards

let invalids = findInvalidCards(batch);


const idInvalidCardCompanies = invalidArray =>{
    let companies = [];

	//ID card comapny by frist digit using switch and pushing them to a temporary array "companies"

    for (card of invalidArray){
        
        switch (card[0]) {
            case 3: companies.push('Amex (American Express)');
            break;
    
            case 4: companies.push('Visa');
            break;
    
            case 5: companies.push('Mastercard');
            break;
    
            case 6: companies.push('Discover');
            break;
                    
            default: companies.push('Company not found')
            }
    }
	
	//trimming all doubled strings from companies array by iterating through it and checking if the new uniqueCompanies Array includes each item
	//if it does NOT the string is pushed into uniqueCompanies Array
	let uniqueCompanies = [];
	for(company of companies){
		if(!uniqueCompanies.includes(company)){
			uniqueCompanies.push(company);
		}
	}
	return uniqueCompanies;
}

console.log(idInvalidCardCompanies(invalids));

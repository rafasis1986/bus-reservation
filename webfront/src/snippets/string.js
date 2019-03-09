
export const numberFormat = (number, decimals) => {
	if(!number) return '';
	const [strIntegers, strDecimals] = number.toString().split('.');
	let tempString = '';
	const reversedList = strIntegers.split('').reverse();
	for(const [i, char] of reversedList.entries()) {
		if(i % 3 === 0) {
			tempString += '.';
		}
		tempString = tempString + char;
	}
	return (
		decimals !== undefined ?
		(decimals === 0 ?
			tempString.substr(1).split('').reverse().join('') :
			tempString.substr(1).split('').reverse().join('') + ',' +
				zerosRightAdd(strDecimals, decimals).substr(0, decimals)) :
		(strDecimals ?
			tempString.substr(1).split('').reverse().join('') + ',' + strDecimals :
			tempString.substr(1).split('').reverse().join(''))
	);
};


export const rutClean = (rut) => {
	return (
		(rut.substr(0, rut.length - 1).replace(/[^0-9]/g, '') +
		rut.substr(-1).replace(/[^0-9Kk]/g, '').toLowerCase()).substr(0, 9)
	);
};

export const rutFormat = (rut) => {
	let tempString = '';
	const reversedList = rut.split('').reverse();
	for(const [i, char] of reversedList.entries()) {
		if(i === 1) {
			tempString += '-';
		} else if((i-1) % 3 === 0) {
			tempString += '.';
		}
		tempString = tempString + char;
	}
	return tempString.split('').reverse().join('');
};

const rutVerifyLastDigit = (rut) => {
	const tempList = [2, 3, 4, 5, 6, 7];
	const splitRut = rut.split('').reverse();
	let counter = 0;
	let sum = 0;
	for (var i = 0; i < splitRut.length; i++) {
		sum += splitRut[i] * tempList[counter];
		counter ++;
		counter = counter >= tempList.length ? 0 : counter;
	}
	const result = 11 - sum % 11;
	switch(result){
		case 11:
			return '0';
		case 10:
			return 'k';
		default:
			return result.toString();
	}
};

export const rutValidate = (rut) => {
	if(rut && rut.length > 1){
		const digitoVerif = rut.substr(-1);
		const rutClean = rut.substr(0, rut.length - 1).replace(/[.,-]/g, '');
		if(isNaN(rutClean * 1) ||
			(isNaN(digitoVerif * 1) && digitoVerif.toLowerCase() !== 'k')){
			return false;
		}
		return rutVerifyLastDigit(rutClean).toLowerCase() === digitoVerif.toLowerCase() ? true : false;
	}
	return false;
};

const zerosLeftAdd = (string, length) => {
	string = string.toString()
	const zerosMissing = length - string.length;
	if(zerosMissing > 0){
		// eslint-disable-next-line
		for(const i of [...Array(zerosMissing).keys()]) {
			string = '0' + string;
		}
	}
	return string;
};

export const zerosLeftRemove = (string) => {
	return !string || isNaN(string * 1) ? string : (string * 1).toString()
};

const zerosRightAdd = (string, length) => {
	string = string ? string.toString() : '';
	const zerosMissing = length - string.length;
	if(zerosMissing > 0){
		// eslint-disable-next-line
		for(const i of [...Array(zerosMissing).keys()]) {
			string += '0';
		}
	}
	return string;
};

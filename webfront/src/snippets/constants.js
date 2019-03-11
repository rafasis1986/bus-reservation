export const ERROR_MESSAGES = {
	DEFAULT: 'An error has occurred, try again.'
};

export const PASSWORD_MIN_LENGTH = 8;

export const HELP_MESSAGES = {
	DEFAULT: 'Error',
	RUT_NO_VALIDO: 'The rout is not valid',
	SAME_AS_PASS: 'Both passwords must be equal',
	INVALID_FIELD() {
		return ( 'Invalid value');
	},
	EMPTY_RESULT(entityName) {
		return (
			entityName ?
				'No results ' + entityName :
				'No results found'
		);
	},
	EMPTY_SEARCH: 'No search results found',
	MIN_LENGTH(value) {
		return (
			value ?
				'This field need at least ' + value + ' characters' :
				'This field need more characters'
		);
	},
	REQUIRED_VALUE(field) {
		return (
			field ? field + ' required' : 'required'
		);
	}
};


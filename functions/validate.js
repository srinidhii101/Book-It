//returns true if the number is greater than or equal to 0
export function isPositiveNumber(number) {
  return number >= 0;
}

//returns true if the password is 8 characters (or more), has one letter and has one number
export function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/.test(password);
}

export function isEmptyString(string) {
  return string.length == 0;
}

//returns true if the email is a valid one
export function isValidEmail(email) {
  return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email);
}

//This method returns true if phone is valid
export function isValidPhone(phone){
 return /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(phone);
}

//This method returns true if postal code is valid
export function isPostalCodeValid(postalCode){
	return /^([A-Za-z]\d[A-Za-z][-]?\d[A-Za-z]\d)$/.test(postalCode);
}

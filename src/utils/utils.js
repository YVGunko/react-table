/**
 * Check if Object is string. 
 * @param x 
 * @returns 
 */
export function isString(x) {
    return Object.prototype.toString.call(x) === "[object String]"
  }
  
/**
 * Check null, should contain only letters, allowed space, min length is minLength. 
 * @param minLength 
 * @param string 
 * @returns 
 */
export const isStringInValid = (string, minLength) => {
    return !string || !string?.trim() || !/^[a-zA-Za-åa-ö-w-я 0-9]+$/.test(string) || string.length < minLength
}
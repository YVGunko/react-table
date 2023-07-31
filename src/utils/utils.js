/**
 * Check null, should contain only letters, allowed space, min length is minLength. 
 * @param minLength 
 * @param string 
 * @returns 
 */
export const isStringInValid = (string, minLength) => {
    return !string || !string?.trim() || !/^[a-zA-Z ]+$/.test(string) || string.length < minLength
}
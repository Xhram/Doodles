// JavaScript Module for Random String Generation

function generateRandomString(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}
function generateRandomNumericString(length) {
    let result = "";
    const numbers = "0123456789";
    for (let i = 0; i < length; i++) {
        result += numbers.charAt(
            Math.floor(Math.random() * numbers.length)
        );
    }
    return result;
}
function generateRandomAlphabeticString(length) {
    let result = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
        result += letters.charAt(
            Math.floor(Math.random() * letters.length)
        );
    }
    return result;
}
function generateUrlSafeString(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}
export {generateRandomString,generateRandomNumericString,generateRandomAlphabeticString,generateUrlSafeString};

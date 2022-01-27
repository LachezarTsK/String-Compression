
/**
 * @param {character[]} characters
 * @return {number}
 */
var compress = function (characters) {

    let left = 0;
    let right = 0;
    let arraySlotsNeededForDigits = 0;
    let currentChar = characters[0];
    const size = characters.length;

    while (++right < size) {

        if (characters[right] === currentChar) {
            let charFrequency = 1;
            while (right < size && characters[right] === currentChar) {
                right++;
                charFrequency++;
            }
            arraySlotsNeededForDigits = numberOfDigits(charFrequency);
            fillArrayWithFrequencyOfCharacter(characters, charFrequency, arraySlotsNeededForDigits, left + 1);
        }

        left += arraySlotsNeededForDigits + 1;
        arraySlotsNeededForDigits = 0;

        if (right < size) {
            currentChar = characters[right];
            characters[left] = characters[right];
        }
    }

    /*
     After the loop, the value of 'right' can be only one of the following: 
     (right = size) i.e. a single character at last index.
     (right = size + 1) i.e. the character at last index is part of a repeated pattern.
     */
    return right === size ? left + 1 : left;
};

/**
 * @param {number} charFrequency
 * @return {number}
 */
function numberOfDigits(charFrequency) {

    let countDigits = 0;
    while (charFrequency > 0) {
        countDigits++;
        charFrequency = Math.trunc(charFrequency / 10);
    }
    return countDigits > 0 ? countDigits : 1;
}

/**
 * @param {character[]} characters
 * @param {number} charFrequency
 * @param {number} arraySlotsNeededForDigits
 * @param {number} index
 */
function fillArrayWithFrequencyOfCharacter(characters, charFrequency, arraySlotsNeededForDigits, index) {

    let divider = Math.pow(10, arraySlotsNeededForDigits - 1);
    const ascii_zeroChar = 48;
    while (arraySlotsNeededForDigits-- > 0) {
        characters[index++] = String.fromCodePoint(Math.trunc(charFrequency / divider) + ascii_zeroChar);
        charFrequency = charFrequency % divider;
        divider = Math.trunc(divider / 10);
    }
}

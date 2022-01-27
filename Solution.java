
public class Solution {

    public int compress(char[] characters) {

        int left = 0;
        int right = 0;
        int arraySlotsNeededForDigits = 0;
        char currentChar = characters[0];
        int size = characters.length;

        while (++right < size) {

            if (characters[right] == currentChar) {
                int charFrequency = 1;
                while (right < size && characters[right] == currentChar) {
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
        return right == size ? left + 1 : left;
    }

    public int numberOfDigits(int charFrequency) {

        int countDigits = 0;
        while (charFrequency > 0) {
            countDigits++;
            charFrequency = charFrequency / 10;
        }
        return countDigits > 0 ? countDigits : 1;
    }

    public void fillArrayWithFrequencyOfCharacter(char[] characters, int charFrequency, int arraySlotsNeededForDigits, int index) {

        int divider = (int) Math.pow(10, arraySlotsNeededForDigits - 1);
        while (arraySlotsNeededForDigits-- > 0) {
            characters[index++] = (char) ((charFrequency / divider) + '0');
            charFrequency = charFrequency % divider;
            divider = divider / 10;
        }
    }
}

/*
You are playing the following Bulls and Cows game with your friend: 
You write down a number and ask your friend to guess what the number is. 
Each time your friend makes a guess, you provide a hint that indicates 
how many digits in said guess match your secret number exactly in both digit and position (called "bulls") 
and how many digits match the secret number but locate in the wrong position (called "cows"). 
Your friend will use successive guesses and hints to eventually derive the secret number.
*/

// 80ms, 93%
var getHint = function(secret, guess) {
    let tally = {}
    for (let s of secret) {
        tally[s] = (tally[s] || 0 ) + 1
    }
    let cows = 0;
    for (let g of guess) {
        if (tally[g] !== undefined && tally[g] > 0) {
            cows++;
            tally[g]--
        }
    }
    let bulls = [...secret].reduce((a, c, i) => c === guess[i] ? a+1 : a, 0);
    cows -= bulls
    return bulls+"A"+cows+"B"
};

/*
Can be done in one pass:
public String getHint(String secret, String guess) {
    int bulls = 0;
    int cows = 0;
    int[] numbers = new int[10];
    for (int i = 0; i<secret.length(); i++) {
        int s = Character.getNumericValue(secret.charAt(i));
        int g = Character.getNumericValue(guess.charAt(i));
        if (s == g) bulls++;
        else {
            if (numbers[s] < 0) cows++;
            if (numbers[g] > 0) cows++;
            numbers[s] ++;
            numbers[g] --;
        }
    }
    return bulls + "A" + cows + "B";
}
*/

const tests = [
  {secret : "1807", guess : "7810", out: "1A3B" },
  {secret : "1123", guess : "0111", out: "1A1B"}
]

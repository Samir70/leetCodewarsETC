var detectCapitalUse = function(word) {
    if (!/[A-Z]/.test(word)) {return true}
    if (!/[a-z]/.test(word)) {return true}
    return /^[A-Z][a-z]*$/.test(word)
};
// faster to iterate through and return false as soon as possible

var tests = [
    'USA', 'hello', 'FlaG', 'Hi', 'I', 'MiddLe', 'sinGle'
];

tests.forEach(t => console.log(
    t, detectCapitalUse(t)
))
/**
 * word begins with vowel, append ma
 *      else move first letter to end and append ma
 * in any case add an a for index of word in sentence, starting with 1
 */

const nAs = n => [...Array(n).fill('a')].join('')
const oneGoat = w => {
    let vowelAtStart = /^[aeiou]/i.test(w)
    return vowelAtStart ? w+'ma' : w.substr(1)+w[0]+'ma'
}
const toGoatLatin = sentence => {
    if (sentence === '') {return ''}
    return sentence.split(' ')
        .map(oneGoat)
        .map((w, i) => w+nAs(i+1))
        .join(' ')
};

const tests = [
    { in: "I speak Goat Latin", out: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa" },
    { in: "The quick brown fox jumped over the lazy dog", out: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa" }
];

tests.forEach(t => console.log(
    t.in, toGoatLatin(t.in) === t.out
))
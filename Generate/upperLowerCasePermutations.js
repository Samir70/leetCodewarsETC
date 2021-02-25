const letterCasePermutation = s => {
    let first = s[0].toLowerCase(), FIRST = s[0].toUpperCase();
    if (s.length === 1) {
        return first === FIRST ? [first] : [first, FIRST]
    }
    let rest = letterCasePermutation(s.slice(1));
    return first === FIRST ? rest.map(x => first + x) : [...rest.map(x => first + x), ...rest.map(x => FIRST + x)]
}
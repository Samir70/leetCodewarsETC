const makeRansomNote = (note, letters) => {
    var len = letters.length
    for (var c of note) {
        letters = letters.replace(c, '');
    }
    // console.log(len - letters.length, note.length)
    return len - letters.length === note.length
}

const tests = [
    ['abdsaf', 'abdhjkjhsf'],
    ['aa', 'aba'],
    ['abcd', 'dcbffgdfga']
]

tests.forEach(t => {
    console.log(t[0], t[1], makeRansomNote(t[0], t[1]))
});
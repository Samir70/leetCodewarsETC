/**
 * return longest substring where every letter has it upper/lowercase counterpart present
 * 
 * method:
 * list all chars,  * spot any single. 
 * split input on the single. 
 * Check the parts
 * 
 */

const partner = c => {
    let cc = c.charCodeAt(0)
    return String.fromCharCode(cc < 97 ? cc + 32 : cc - 32)
}

 const longestNiceSubstring = str => {
     if (str.length < 2) {return ''}
    let seen = new Set(), need = new Set()
    for (let c of str) {
        let code = c.charCodeAt(0);
        seen.add(c)
        let p = partner(c);
        // console.log(c, code, partnerCode, partner);
        need.delete(c);
        if (!seen.has(p)) {need.add(p)}
        // console.log(seen, [...need])
    }
    let single = [...need][0];
    if (single === undefined) {return str}
    let parts = str.split(partner(single)).map(s => longestNiceSubstring(s))
    // console.log(parts);
    return parts.reduce((out, s) => s.length > out.length ? s : out, '')
}

const tests = [
    "YazaAay", "Bb", "c", "dDzeE"
]

const out = ["aAa", "Bb", "", "dD"]

tests.forEach((t, i) => console.log(
    'test', i, longestNiceSubstring(t) === out[i]
));
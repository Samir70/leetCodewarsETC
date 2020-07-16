const {longString, longString2} = require('./longString')

// Rabin-Karp algorthm
const findGivenLen = (nums, len) => {
    var hashes1 = new Set(), hashes2 = new Set();
    var hash1 = 0, hash2 = 0;
    var base1 = 2**31 - 1, base2 = 2**31+1;
    var bigDigit1 = 1, bigDigit2 = 1;
    for (var i = 0;  i<len; i++) {
        hash1 = (hash1*26 + nums[i]) % base1;
        bigDigit1 = (bigDigit1*26) % base1;
        hash2 = (hash2*26 + nums[i]) % base2;
        bigDigit2 = (bigDigit2*26) % base2;
    }
    hashes1.add(hash1);
    hashes2.add(hash2);
    // console.log(nums, hash1, bigDigit1)
    for (var s = 1; s<nums.length - len+1; s++) {
        hash1 = ((hash1*26 - nums[s-1]*bigDigit1%base1 + base1)  + nums[s-1+len]) % base1;
        hash2 = ((hash2*26 - nums[s-1]*bigDigit2%base2 + base2)  + nums[s-1+len]) % base2;
        // console.log('hash1', hash1)
        if (hashes1.has(hash1) && hashes2.has(hash2)) {return s}
        hashes1.add(hash1)
        hashes2.add(hash2)
    }
    return ''
}

const longestDupSubstring = str => {
    var nums = [...str].map(x => x.charCodeAt(0) - 97)
    var max = str.length, min = 0, posAns = Math.floor(str.length / 2);
    var best = '';
    while (posAns > min && posAns < max) {
        var dup = findGivenLen(nums, posAns);
        // console.log(dup)
        if (dup !== '') {
            best = str.substr(dup, posAns);
            // console.log('found:', best)
            min = posAns;
            posAns += Math.floor((max - posAns) / 2) || 1
        } else {
            max = posAns
            posAns -= Math.floor((posAns - min) / 2) || 1;
        }
        // console.log('posAns is now:', posAns)
    }
    return best
}

const tests = [
    { in: 'banana', out: 'ana' },
    {in:'aaaaaa', out:'aaaaa'},
    {in:'thisisanrandomsentencethatwillhavesomerepeatedsubstringimsureormaybeitwillnot', out:'twill'},
    {in:'thisisanrandomsentencethatwillhavesomerepeatedsubstringimsureormaybeitwillnotbutitslengthismuchlessthanthetentothefivethatmaybegivenplusitslengthissomethingimaytrytorepeatandrepeatandrepeatandwhatifihavemissedsomeweirdwayofhidingthesubarray', out:'repeatandrepeatand'},
    {in:'thisisanonrandomsentencethatwillberepeatedafterawhiletogivealongrepeatedsubstringwillitcauseahashcollisionbeforedoingsoletusfindoutthisisanonrandomsentencethatwillberepeatedafterawhiletogivealongrepeatedsubstringwillitcauseahashcollisionbeforedoingsocarryonandonforabitbecauseweneedtheinputtobelongenoughtoriskgettingacollisionforanonanswerthatislongerthantheactualanswerbutidontreallyknowhowlongtogoonforblahblahblahshdfgdshglsdfhglsdkjfhguerhliudsflgjlkweruyoiuyfsdfhdskjbvdsljvbjdslfjsdhljfhhhhgggggggggggggggggggggggggggggggggieurytoiuetyoieurfhsdulfhdjkhdffjjjjjjjjjjjjjjjjdffffffffffffffdastuyiuyi', out:'repeatandrepeatand'},
    {in:'abcde', out:''},
    {in:'abcdeaf', out:'a'},
    {in:longString, out:'babaaaabbbbabbababbabbbababbbb'},
    // i got
    // bbaababaabbbbaabaaaababbbabbbb 
    // babaaaabbbbabbababbabbbababbbb
    {in:longString2, out:"aeeebaabd"}
];

tests.forEach((t, i) => console.log(
    'test', i, longestDupSubstring(t.in), 'should be', t.out
))
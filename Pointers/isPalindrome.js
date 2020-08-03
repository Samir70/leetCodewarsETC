var isPalindrome = function(s) {
    var work = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    var start = 0, end = work.length - 1;
    while (start < end) {
        if (work[start] !== work[end]) {return false}
        start++;
        end--
    }
    return true
};

const tests = [
    {s:"A man, a plan, a canal: Panama", out:true},
    {s:"race a car", out:false},
    {s:"abcdedcba", out:true},
    {s:"abcDdcba", out:true},
    {s:"0P", out:false}
];

tests.forEach((t, i) => console.log(
    'test', i, isPalindrome(t.s), 'should be', t.out
))
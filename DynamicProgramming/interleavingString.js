var isInterleave = function(s1, s2, s3) {
    if (s3.length !== s1.length + s2.length) {return false}
    let memo = {'--' : true}
    const helper = (a, b, c) => {
        let key = [a, b, c].join('-')
        if (memo[key] !== undefined) {return memo[key]}
        // console.log('working out', key)
        // console.log(memo)
        let try1 = a[0] === c[0] && helper(a.slice(1), b, c.slice(1));
        let try2 = b[0] === c[0] && helper(a, b.slice(1), c.slice(1));
        memo[key] =  try1 || try2 
        return memo[key]
    }
    let t1 = s1[0] === s3[0] && helper(s1.slice(1), s2, s3.slice(1));
    let t2 = s2[0] === s3[0] && helper(s1, s2.slice(1), s3.slice(1));
    return t1 || t2
};

const tests = [
  {a:"", b:"b", c:"b", out:true}, 
  {a:"aabcc", b:"dbbca", c:"aadbbcbcac", out:true}
]

// Add a number K to array A, where A contains the digits of another number.

var addToArrayForm = function(A, K) {
    let carry = 0;
    let pos = A.length - 1;
    while (K > 0 && pos >= 0) {
        let digit = K % 10;
        K = Math.floor(K/10);
        let sum = A[pos] + carry + digit;
        carry = sum > 9 ? 1 : 0;
        A[pos] = sum % 10;
        pos--
        K += carry; carry = 0
    }
    
    return K > 0 ? [...''+K].map(Number).concat(A) : A
};

const tests = [
  {a: [1,2,0,0], k: 34, out: [1,2,3,4]},
  {a: [2,1,5], k: 806, out: [1,0,2,1]},
  {a: [9,9,9,9,9,9,9,9,9,9], k: 1, out: [1,0,0,0,0,0,0,0,0,0,0]}
];

tests.forEach((t, i) => console.log(
  'test', i, addToArrayForm(t.a, t.k) === t.out
))

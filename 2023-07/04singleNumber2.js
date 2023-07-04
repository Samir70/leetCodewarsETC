// find singleton in an array where all other values appear atleast twice
// (if it was guaranteed exactly twice, we could use xor)
// O(n) for both speed and memory
const singleNumber2 = nums => {
    var tally = {};
    for (var n of nums) {
        if (tally[n] === undefined) {tally[n] = 0}
        tally[n]++
    }
   return  Number(Object.keys(tally).find(x => tally[x] === 1))
}

const singleNumber = nums => {
  let ones = 0, twos = 0;
  for (let n of nums) {
    ones ^= (n & ~twos)
    twos ^= (n & ~ones)
  }
  // console.log({ones: ones.toString(2), twos: twos.toString(2)})
  return ones
}

const tests = [
    { in: [2, 2, 3, 2], out: 3 },
    { in: [0, 1, 0, 1, 0, 1, 99], out: 99 }
]

tests.forEach((t, i) => console.log(
    'tests', i, '::', singleNumber(t.in) === t.out
))

/**
 * The code makes use of 2 variables.

ones - At any point of time, this variable holds XOR of all the elements which have
appeared "only" once.
twos - At any point of time, this variable holds XOR of all the elements which have
appeared "only" twice.

So if at any point time,

    A new number appears - It gets XOR'd to the variable "ones".
    A number gets repeated(appears twice) - It is removed from "ones" and XOR'd to the
    variable "twos".
    A number appears for the third time - It gets removed from both "ones" and "twos".

The final answer we want is the value present in "ones" - coz, it holds the unique element.

So if we explain how steps 1 to 3 happens in the code, we are done.
Before explaining above 3 steps, lets look at last three lines of the code,

common_bit_mask = ~(ones & twos)

ones & = common_bit_mask

twos & = common_bit_mask

All it does is, common 1's between "ones" and "twos" are converted to zero.

For simplicity, in all the below explanations - consider we have got only 4 elements in the array (one unique element and 3 repeated elements - in any order).

Explanation for step 1

Lets say a new element(x) appears.

CURRENT SITUATION - Both variables - "ones" and "twos" has not recorded "x".

Observe the statement "twos| = ones & x".
Since bit representation of "x" is not present in "ones", AND condition yields nothing. So "twos" does not get bit representation of "x".
But, in next step "ones ^= x" - "ones" ends up adding bits of "x". Thus new element gets recorded in "ones" but not in "twos".

The last 3 lines of code as explained already, converts common 1's b/w "ones" and "twos" to zeros.
Since as of now, only "ones" has "x" and not "twos" - last 3 lines does nothing.

Explanation for step 2.

Lets say an element(x) appears twice.

CURRENT SITUATION - "ones" has recorded "x" but not "twos".

Now due to the statement, "twos| = ones & x" - "twos" ends up getting bits of x.
But due to the statement, "ones ^ = x" - "ones" removes "x" from its binary representation.

Again, last 3 lines of code does nothing.
So ultimately, "twos" ends up getting bits of "x" and "ones" ends up losing bits of "x".

Explanation for step 3.

Lets say an element(x) appears for the third time.

CURRENT SITUATION - "ones" does not have bit representation of "x" but "twos" has.

Though "ones & x" does not yield nothing .. "twos" by itself has bit representation of "x". So after this statement, "two" has bit representation of "x".
Due to "ones^=x", after this step, "one" also ends up getting bit representation of "x".

Now last 3 lines of code removes common 1's of "ones" and "twos" - which is the bit representation of "x".
Thus both "ones" and "twos" ends up losing bit representation of "x".
 */
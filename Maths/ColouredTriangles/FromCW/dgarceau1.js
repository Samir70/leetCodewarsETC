/*

Interpreting R as 0, G as 1 and B as 2 (any mapping of RGB unto 012 would work) allows us
to calculate the result using arithmetic

Let's use the dot (.) to represent the operation

0.0 = 0, 0.1 = 2, 0.2 = 1
1.0 = 2, 1.1 = 1, 1.2 = 0
2.0 = 1, 2.1 = 0, 2.2 = 2

It turns out that a.b = 2(a + b) (mod 3)

Using this fact and Pascal's triangle (mod 3) we can calculate what the bottom value is going to
be in O(n)

Note that we can essentially use Pascal's coefficient and then multiply by the appropriate power of 2,
which will alternate between 1 and 2 in mod 3.

The calculation of Pascal's triangle (mod 3) is done using a pattern. Every (3^k + 1)th row is a 1
followed by (3^k - 1) 0 followed by a last 1. Furthermore, every (2 * 3^k + 1)th row is a 1 followed
by (3^k - 1) 0 followed by a 2 followed by (3^k - 1) 0 followed by a 1. This allows a recursive pattern
which means we can compute Pascal's nth row in O(log(n)).

*/

function triangle(row) {
    function getPascalMod3(n, reverse) {
        if (n === 1) return reverse ? '2' : '1';
        var t = (n - 1).toString(3).substring(1) || '0';
        var p = parseInt(t, 3) + 1;
        if ((n - p) % 2 === 0) {
            var x = getPascalMod3(p, reverse);
            var y = getPascalMod3(p, !reverse);
            var z = new Array((n - 3 * p) / 2 + 1).join('0')
            return x + z + y + z + x;
        }
        else {
            var x = getPascalMod3(p, reverse);
            return x + (new Array(n - 2 * p + 1).join('0')) + x;
        }
    }
    var p = getPascalMod3(row.length, false);
    var v = 0;
    for (var i = 0; i < row.length; i++) {
        v += { R: 0, G: 1, B: 2 }[row[i]] * { '0': 0, '1': 1, '2': 2 }[p[i]];
        v %= 3;
    }
    if (row.length % 2 === 0) v = (v * 2) % 3;
    return 'RGB'[v];
}
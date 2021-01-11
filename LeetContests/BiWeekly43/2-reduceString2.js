// from pgmreddy
const top = (stack) => stack[stack.length-1] || null;       // stack top() function   to get last element of stack  OR  null

var maximumGain = function(S, x, y) {
	let sum = 0;
	S = S.split("");                                        // String S as an array to save memory & speed

	function removePatternFromS(pat, cost) {                // pattern is either "ab"/"ba", cost is x/y
		const stack = [];
		for (const ch of S) {
			if ((ch == pat[1]) && top(stack) == pat[0]) {   // do  stack top & ch  match  pattern?
				stack.pop();                                // YES, pop pattern[0] off the stack
				sum += cost;                                //      add cost for matched pattern
			} else {
				stack.push(ch);                             // NO,  possibly  1st char of pattern
			}
		}
		S = stack;                                          // remaining in stack, is new S
	}

    if (x >= y) {                                           // "ab" cost (x) is higher, take it first to gain maximum points
        removePatternFromS("ab", x);
        removePatternFromS("ba", y);
    } else {                                                // "ba" cost (y) is higher, take it first to gain maximum points
        removePatternFromS("ba", y);
        removePatternFromS("ab", x);
    }
	return sum;
}
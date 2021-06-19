var generateParenthesis = function(n) {
    let left = 0;
    let stack = [['', 0]]
    while (left < n) {
        let newStack = []
        left++;
        while (stack.length) {
            let [cur, right] = stack.pop();
            cur += '(';
            if (left === n) {
                for (let r = right; r < n; r++) {cur += ')'}
                newStack.push([cur, n])
            } else {
                newStack.push([cur, right])
                for (let r = right; r < left; r++) {
                    cur += ')'
                    newStack.push([cur, r+1])
                }
            }
        }
        stack = [...newStack]
        // console.log(left, stack)
    }
    return stack.map(x => x[0])
};

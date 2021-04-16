const removeDuplicates = (s, k) => {
    let out = '';
    let prev = null, stack = []
    for (let c of s) {
        out += c;
        if (prev === null) {
            prev = {letter:c, count:1}
        } else {
            if (prev.letter === c) {
                prev.count++
            } else {
                stack.push(prev)
                prev = {letter:c, count:1}
            }
        }
        if (prev.count === k) {
            out = out.slice(0, -k)
            prev = stack.length ? stack.pop() : null
        }
        // console.log(out, prev, stack)
    }
    return out
}

/**
 * Lee215, two pointers:
 * public String removeDuplicates(String s, int k) {
        int i = 0, n = s.length(), count[] = new int[n];
        char[] stack = s.toCharArray();
        for (int j = 0; j < n; ++j, ++i) {
            stack[i] = stack[j];
            count[i] = i > 0 && stack[i - 1] == stack[j] ? count[i - 1] + 1 : 1;
            if (count[i] == k) i -= k;
        }
        return new String(stack, 0, i);
    }
    stack:
    def removeDuplicates(self, s, k):
        stack = [['#', 0]]
        for c in s:
            if stack[-1][0] == c:
                stack[-1][1] += 1
                if stack[-1][1] == k:
                    stack.pop()
            else:
                stack.append([c, 1])
        return ''.join(c * k for c, k in stack)
 */

const tests = [
    { s: "abcd", k: 2, out: "abcd" },
    { s: "deeedbbcccbdaa", k: 3, out: "aa" },
    { s: "pbbcggttciiippooaais", k: 2, out: "ps" }
];

tests.forEach((t, i) => console.log(
    'test', i, removeDuplicates(t.s, t.k) === t.out
))
const bigTest = require('./wordLadder2Test');
// 124ms 61%
const oneDiff = (a, b) => {
    let diffs = 0;
    for (let i = 0; i < a.length; i++) {
        diffs += a[i] === b[i] ? 0 : 1
        if (diffs > 1) {return false}
    }
    return true
}
var findLadders = function(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) {return []}
    let adjList = {}
    for (let i = 0; i < wordList.length; i++) {
        let cur = wordList[i]
        for (let j = i+1; j < wordList.length; j++) {
            let compare = wordList[j]
            if (oneDiff(cur, compare)) {
                if (adjList[cur] === undefined) {adjList[cur] = []}
                if (adjList[compare] === undefined) {adjList[compare] = []}
                adjList[cur].push(compare)
                adjList[compare].push(cur)
            }
        }
    }
    // console.log(adjList)
    let stack = [], out = []
    let firstReached = {}
    for (let w of wordList) {
        if (oneDiff(w, beginWord)) {
            if (w === endWord) {return [[beginWord, w]]}
            firstReached[w] = 1
            stack.push({path:[beginWord, w], visited: new Set([w]), last:w})
        }
    }
    while (stack.length) {
        // console.log(stack); 
        // console.log(firstReached)
        let newStack = []
        while (stack.length) {
            let cur = stack.pop();
            // console.log('path so far', cur.path, 'will check', adjList[cur.last])
            if (adjList[cur.last] === undefined) {adjList[cur.last] = []}
            for (let next of adjList[cur.last]) {
                if (cur.visited.has(next)) {continue}
                if (firstReached[next] && firstReached[next] < cur.path.length) {continue}
                if (next === endWord) {out.push([...cur.path, next]); continue}
                let nextSet = new Set(cur.visited);
                nextSet.add(next)
                firstReached[next] = cur.path.length;
                newStack.push({path:[...cur.path, next], visited: nextSet, last: next})
            }
        }
        if (out.length > 0) {return out}
        stack = [...newStack]
    }
    return []
};

const tests = [
    { beginWord: "hit", endWord: "cog", wordList: ["hot", "dot", "dog", "lot", "log", "cog"] },
    { beginWord: "hit", endWord: "cog", wordList: ["hot", "dot", "dog", "lot", "log"] },
    { beginWord: "hot", endWord: "dog", wordList: ["hot", "dog"] },
    { beginWord: bigTest.beginWord, endWord: bigTest.endWord, wordList: bigTest.wordList }
]

tests.forEach((t, i) => console.log(
    'test', i, findLadders(t.beginWord, t.endWord, t.wordList)
))
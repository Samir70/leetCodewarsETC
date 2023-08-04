class trieNode {
  constructor(name) {
    this.key = name;
    this.children = {};
    this.wordEnd = false
  }
}

class Trie {
  constructor() {
    this.head = {
      val: null,
      children: {}
    }
  }

  insert(word) {
    var current = this.head;
    for (var w of word) {
      if (current.children[w] === undefined) {
        current.children[w] = new trieNode(w)
      }
      current = current.children[w]
    }
    current.wordEnd = true;
  }

  search(word, prefix = false) {
    var current = this.head;
    for (var w of word) {
      if (current.children[w] === undefined) { return false }
      current = current.children[w]
    }
    return prefix ? true : current.wordEnd;
  }

  startsWith(word) {
    return this.search(word, true)
  }

  findPrefixes(word) {
    let out = [], s = "";
    let current = this.head;
    for (let w of word) {
      if (current.children[w] === undefined) { return out }
      s += w
      current = current.children[w]
      if (current.wordEnd) { out.push(s) }
      // console.log("finding prefixes", {word, w, s, out, flag:current.wordEnd})
    }
    return out
  }
}

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const words = new Trie()
  for (let word of wordDict) { words.insert(word) }
  let memo = {}

  const helper = (s) => {
    if (words.search(s)) { return true }
    if (memo[s] !== undefined) {return memo[s]}
    let prefixes = words.findPrefixes(s)
    // console.log({s, wordDict, prefixes})
    for (let p of prefixes) {
      if (helper(s.slice(p.length))) { memo[s] = true; return true }
    }
    memo[s] = false
    return false
  }
  return helper(s)
};

const tests = [
  { args: ["leetcode", ["leet", "code"]], out: true },
  { args: ["applepenapple", ["apple", "pen"]], out: true },
  { args: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], out: false },
  { args: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",   ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]], out: false}
];

tests.forEach((t, i) => {
  let res = wordBreak(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
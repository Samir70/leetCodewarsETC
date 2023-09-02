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
}
/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 * The problem is about breaking a given string, s of length n, 
 * into non-overlapping substrings such that 
 * each substring is present in a given dictionary of words. 
 * The objective is to minimize the number of extra characters left over 
 * after the string is broken up optimally. 
 */
var minExtraChar = function (s, dictionary) {
  let trie = new Trie()
  for (let word of dictionary) { trie.insert(word) }
  let hash = {}
  const helper = (str) => {
    if (str === "") { return 0 }
    if (hash[str] !== undefined) { return hash[str] }
    let out = Infinity;
    for (let i = 0; i < str.length; i++) {
      let substr = str.slice(0, i + 1), restOfStr = str.slice(i + 1);
      let minWithSubstr = Infinity;
      if (trie.search(substr)) {
        minWithSubstr = helper(restOfStr)
      }
      let minWithoutSubstring = substr.length + helper(restOfStr)
      // console.log({ str, i, substr, restOfStr, minWithSubstr, minWithoutSubstring })
      out = Math.min(minWithSubstr, minWithoutSubstring, out)
    }
    hash[str] = out;
    return out
  }
  return helper(s)
};

const tests = [
  { args: ["leetscode", ["leet", "code", "leetcode"]], out: 1 },
  { args: ["sayhelloworld", ["hello", "world"]], out: 3 },
  { args: ["tomorrowishere", ["to", "tomorrow", "she", "here"]], out: 2 },
  { args: ["here", ["to", "tomorrow", "she", "here"]], out: 0 },
];

tests.forEach((t, i) => {
  let res = minExtraChar(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
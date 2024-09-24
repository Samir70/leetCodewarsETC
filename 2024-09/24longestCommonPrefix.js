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

  search(word) {
    var current = this.head;
    for (let i = 0; i < word.length; i++) {
      let w = word[i]
      // console.log(`${i} looking for ${w} res: ${current.children[w]}`)
      if (current.children[w] === undefined) { return i }
      current = current.children[w]
    }
    return word.length
  }
}

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function (arr1, arr2) {
  let numTrie = new Trie()
  for (let num of arr1) {
    numTrie.insert("" + num)
  }
  let maxLen = 0
  for (let num of arr2) {
    let word = "" + num
    maxLen = Math.max(maxLen, numTrie.search(word))
  }
  return maxLen
};

const tests = [
  { args: [[1, 10, 100], [1000]], out: 3 },
  { args: [[1, 2, 3], [4, 4, 4]], out: 0 },
]

tests.forEach((t, i) => {
  let res = longestCommonPrefix(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
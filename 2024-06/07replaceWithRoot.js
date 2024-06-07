/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
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
    let out = ""
    var current = this.head;
    for (var w of word) {
      if (current.children[w] === undefined) { return false }
      current = current.children[w]
      out += w
      if (current.wordEnd) { return out }
    }
    return prefix ? true : current.wordEnd;
  }

  startsWith(word) {
    return this.search(word, true)
  }
}

var replaceWords = function (dictionary, sentence) {
  let trie = new Trie()
  let words = sentence.split(" ")
  for (let d of dictionary) { trie.insert(d) }
  let out = []
  for (let word of words) {
    let prefix = trie.search(word)
    out.push(prefix ? prefix : word)
  }
  return out.join(" ")
};

const tests = [
  { args: [["cat", "bat", "rat"], "the cattle was rattled by the battery"], out: "the cat was rat by the bat" },
  { args: [["a", "b", "c"], "aadsfasf absbs bbab cadsfafs"], out: "a a b c" },
];

tests.forEach((t, i) => {
  let res = replaceWords(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
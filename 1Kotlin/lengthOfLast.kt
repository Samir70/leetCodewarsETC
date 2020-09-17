class Solution {
    fun lengthOfLastWord(s: String): Int {
        val words = s.trim(' ').split(' ');
        if (words.count() === 0) {return 0}
        print(words)
        return words[words.count() - 1].length
    }
}

/*
tests: "hello world", "a ", "", "a"
*/

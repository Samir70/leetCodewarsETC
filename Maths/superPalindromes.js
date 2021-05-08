const isPalindrome = n => {
    let s = [...''+n];
    for (let i = 0; i < s.length/2; i++) {
        if (s[i] !== s[s.length - i - 1]) {return false}
    }
    return true
}

const superpalindromesInRange = (left, right) => {
    let lim = 100000;
    let supPs = [0];
    for (let i = 1; i < lim; i++) {
        let s = [...''+i];
        let rev = [...s].reverse()
        let odd = Number([...s, ...rev.slice(1)].join('')), even = Number([...s, ...rev].join(''))
        if (isPalindrome(odd*odd)) {supPs.push(odd*odd)}
        if (isPalindrome(even*even)) {supPs.push(even*even)} 
    }
    console.log(supPs.sort((a, b) => a - b).map(x => [x, Math.sqrt(x)]).join(', '))
}

superpalindromesInRange(0, 0)
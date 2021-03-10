var canConvertString = function(s, t, k) {
    if (s.length !== t.length) {return false}
    let shifts = {}
    for (let i = 0; i < s.length; i++) {
        let shift = t[i].charCodeAt(0) - s[i].charCodeAt(0);
        while (shift < 0) {shift += 26}
        shifts[shift] = (shifts[shift] || 0) + 1
    }
    for (let i = 1; i < 26; i++) {
        if (!shifts[i]) {continue}
        let need = (shifts[i] - 1) *26 + i 
        if (need > k) {return false}
    }
    return true
};
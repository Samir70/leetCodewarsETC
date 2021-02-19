var minRemoveToMakeValid = function(s) {
    let count = 0;
    let out = ''
    for (let c of s) {
        switch (c) {
            case '(' : {count++; break}
            case ')' : {count--; break}
            default : {}
        }
        if (count >= 0) {
            out += c
        } else {
            count++
        }
    }
    count = 0;
    // console.log(out);
    let out2 = '';
    for (let i = out.length - 1; i>=0; i--) {
        switch (out[i]) {
            case ')' : {count++; break}
            case '(' : {count--; break}
            default : {}
        }
        if (count >= 0) {
            out2 = out[i] + out2
        } else {
            count++
        }
    }
    return out2
};
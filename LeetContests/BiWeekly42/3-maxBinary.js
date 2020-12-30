var maximumBinaryString = function (binary) {
    let i = 0;
    while (binary[i] === '1') { i++ }
    if (i === binary.length) { return binary }
    let ones = 0;
    while (i < binary.length) {
        if (binary[i] === '1') { ones++ }
        i++
    }
    let out = Array(binary.length).fill(1)
    out[binary.length - ones - 1] = 0;
    return out.join('')
};

const tests = [
    "000110",
    "101010111011001101000110010001100001111",
    "10",
    "01",
    "11"
]

const outputs = [
    "111011",
    "111111111111111111101111111111111111111",
    "10",
    "01",
    "11"
]

tests.forEach((t, i) => console.log(
    'test', i, maximumBinaryString(t) === outputs[i]
))
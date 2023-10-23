const countBits = (n) => n === 0 ? 0 : 1 + countBits(n & (n - 1));
const isPower4 = (n) => countBits(n) === 1 && countBits(n-1) % 2 === 0;
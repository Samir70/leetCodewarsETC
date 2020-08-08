// change at most one digit from a 6 to a 9
var maximum69Number  = function(num) {
    return Number((''+num).replace('6', '9'))
};

[9669, 9999, 9996, 6, 696666, 96999996].forEach(t => console.log(
    t, '->', maximum69Number(t)
))
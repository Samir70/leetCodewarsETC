// 372 ms, faster than 5.25%
var calPoints = function(ops) {
    let record = []
    for (let op of ops) {
        let n = Number(op)
    
        if (!/[CD\+]/.test(op) ) {record.push(n)}
        if (op === 'D') {
            let d = record.pop();
            record.push(d, d*2)
        }
        if (op === '+') {
            let a = record.pop();
            let b = record.pop();
            record.push(b, a, a+b)
        }
        if (op === 'C') {record.pop()}
        console.log(record)
    }
    
    return record.reduce((a, b) => a+b, 0)
};

const tests = [
  {ops: ["5","-2","4","C","D","9","+","+"], out:27}, 
  {ops:["5","2","C","D","+"], out:30}
];

tests.forEach((t, i) => console.log(
  'test', i, calPoints(t.ops) === t.out
));

// faster
var calPointsFromLeet = function(ops){
    const arr = []
    let total = 0
    ops.forEach((op) => {
        let value = 0
        switch(op){
            case '+': value = arr[arr.length-2] + arr[arr.length-1]
                break
            case 'C': value = -arr.pop()
                break
            case 'D': value = arr[arr.length-1]*2
                break
            default: value = Number(op)
                
        }
        if(op !== 'C') arr.push(value)
        total += value
    })
    return total
};

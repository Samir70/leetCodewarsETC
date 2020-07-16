const maj = (arr) =>{
    const mustBe = arr.length % 2 ? (arr.length - 1)/2 : arr.length/2 - 1;
    return {
        majority: arr.sort((a, b) => a-b)[mustBe],
        index: mustBe
    }
}

const tests = [
    [3,2,3,4,3],
    [2,1,2],
    [1,2,3,1,4,1,1],
    [2,2,1,1,1,2,2],
    [2,2,1,1,1,2,2,1,1,1],
    [2,2,1,1,2,1,2,2]
];

tests.forEach(t => console.log(t, maj(t)));
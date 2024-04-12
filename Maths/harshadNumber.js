/**
 * @param {number} x
 * @return {number}
 */
var sumOfTheDigitsOfHarshadNumber = function (x) {
  let digitSum = [...'' + x].map(Number).reduce((a, c) => a + c)
  return x % digitSum === 0 ? digitSum : -1
};

let harshads = {}
for (let i = 1; i < 1000; i++) {
  let s = sumOfTheDigitsOfHarshadNumber(i)
  if (s !== -1) {
    if (harshads[s] === undefined) { harshads[s] = [] }
    harshads[s].push(i)
  }
}

console.log(harshads)

harshads = {
  '1': [1, 10, 100],
  '2': [2, 20, 110, 200],
  '3': [3, 12, 21, 30, 102, 111, 120, 201, 210, 300],
  '4': [4, 40, 112, 220, 400],
  '5': [5, 50, 140, 230, 320, 410, 500],
  '6': [
    6, 24, 42, 60, 114, 132, 150, 204, 222, 240,
    312, 330, 402, 420, 510, 600
  ],
  '7': [7, 70, 133, 322, 511, 700],
  '8': [8, 80, 152, 224, 440, 512, 800],
  '9': [
    9, 18, 27, 36, 45, 54, 63, 72, 81,
    90, 108, 117, 126, 135, 144, 153, 162, 171,
    180, 207, 216, 225, 234, 243, 252, 261, 270,
    306, 315, 324, 333, 342, 351, 360, 405, 414,
    423, 432, 441, 450, 504, 513, 522, 531, 540,
    603, 612, 621, 630, 702, 711, 720, 801, 810,
    900
  ],
  '10': [190, 280, 370, 460, 550, 640, 730, 820, 910],
  '11': [209, 308, 407, 506, 605, 704, 803, 902],
  '12': [
    48, 84, 156, 192, 228, 264, 336, 372, 408, 444,
    480, 516, 552, 624, 660, 732, 804, 840, 912
  ],
  '13': [247, 364, 481, 715, 832],
  '14': [266, 392, 518, 644, 770],
  '15': [
    195, 285, 375, 465, 555, 645, 690, 735,
    780, 825, 870, 915, 960
  ],
  '16': [448, 592, 736, 880],
  '17': [476, 629, 782, 935],
  '18': [
    198, 288, 378, 396, 468, 486, 558, 576, 594, 648, 666, 684,
    738, 756, 774, 792, 828, 846, 864, 882, 918, 936, 954, 972, 990
  ],
  '19': [874],
  '21': [399, 588, 777, 966],
  '24': [888],
  '27': [999]
}
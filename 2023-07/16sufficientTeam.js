const bitMask = (skillId, person) => person
  .map(skill => 1 << skillId[skill])
  .reduce((acc, val) => acc | val, 0)

const flipBits = (num, numDigits) => ~num & ((2 ** numDigits) - 1);
const countBits = (n) => n === 0n ? 0n : 1n + countBits(n & (n - 1n));

/**
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
var smallestSufficientTeam = function (req_skills, people) {
  let skillId = {}
  for (let i = 0; i < req_skills.length; i++) { skillId[req_skills[i]] = i }
  let peeps = people.map(p => bitMask(skillId, p))
  // console.log(skillId, peeps)
  let numPeople = people.length, numSkills = req_skills.length, target = 2 ** numSkills - 1;
  let allPeopleBitMask = 2n ** BigInt(numPeople) - 1n
  // console.log(allPeopleBitMask)
  let dp = Array(2 ** numSkills).fill(allPeopleBitMask)
  dp[0] = 0n
  for (let skillMask = 1; skillMask < dp.length; skillMask++) {
    for (let i = 0; i < numPeople; i++) {
      let smallerSkillMask = skillMask & flipBits(peeps[i], numSkills)
      // console.log({ skillMask, smallerSkillMask, peep: peeps[i], notPeep: flipBits(peeps[i], numSkills) })
      if (smallerSkillMask !== skillMask) {
        let peopleMask = dp[smallerSkillMask] | BigInt(2 ** i)
        if (countBits(peopleMask) < countBits(dp[skillMask])) {
          dp[skillMask] = peopleMask
        }
      }
    }
  }
  let finalMask = dp[dp.length - 1]
  // console.log({finalMask})
  let out = [], i = 0
  while (finalMask > 0n) {
    if (finalMask & 1n) {
      out.push(i)
    }
    finalMask = finalMask / 2n
    i++
  }
  return out
};

const tests = [
  { args: [["java", "nodejs", "reactjs"], [["java"], ["nodejs"], ["nodejs", "reactjs"]]], out: 2, possSet: [0, 2] },
  { args: [["algorithms", "math", "java", "reactjs", "csharp", "aws"], [["algorithms", "math", "java"], ["algorithms", "math", "reactjs"], ["java", "csharp", "aws"], ["reactjs", "csharp"], ["csharp", "math"], ["aws", "java"]]], out: 2, possSet: [1, 2] },
  {
    args: [["hkyodbbhr", "p", "biflxurxdvb", "x", "qq", "yhiwcn"], [["yhiwcn"], [], [], [], ["biflxurxdvb", "yhiwcn"], ["hkyodbbhr"], ["hkyodbbhr", "p"], ["hkyodbbhr"], [], ["yhiwcn"], ["hkyodbbhr", "qq"], ["qq"], ["hkyodbbhr"], ["yhiwcn"], [], ["biflxurxdvb"], [], ["hkyodbbhr"], ["hkyodbbhr", "yhiwcn"], ["yhiwcn"], ["hkyodbbhr"], ["hkyodbbhr", "p"], [], [], ["hkyodbbhr"], ["biflxurxdvb"], ["qq", "yhiwcn"], ["hkyodbbhr", "yhiwcn"], ["hkyodbbhr"], [], [], ["hkyodbbhr"], [], ["yhiwcn"], [], ["hkyodbbhr"], ["yhiwcn"], ["yhiwcn"], [], [], ["hkyodbbhr", "yhiwcn"], ["yhiwcn"], ["yhiwcn"], [], [], [], ["yhiwcn"], [], ["yhiwcn"], ["x"], ["hkyodbbhr"], [], [], ["yhiwcn"], [], ["biflxurxdvb"], [], [], ["hkyodbbhr", "biflxurxdvb", "yhiwcn"], []]],
    out: 4, possSet: [21,26,49,58] 
  },
];

tests.forEach((t, i) => {
  let res = smallestSufficientTeam(...t.args);
  if (res.length !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
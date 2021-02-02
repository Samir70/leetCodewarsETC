/**
 * Find the users that need to learn a language, 
 *      -- that is the users that have a friend with whom they can't speak 
 * and then find the most known language amongst those users. 
 * The answer is the number of users that doesn't know that language 
 * which is the one you will teach them.
 */

/**
 * @param {*} n number of languages
 * @param {*} languages language spoken by ith member (1 indexed)
 * @param {*} friendships list of [a, b] where a and b are friends.
 */

const minimumTeachings = (n, languages, friendships) => {

}

const tests = [
    { n: 2, langs: [[1], [2], [1, 2]], fr: [[1, 2], [1, 3], [2, 3]], out: 1 },
    { n: 3, langs: [[2], [1, 3], [1, 2], [3]], fr: [[1, 4], [1, 2], [3, 4], [2, 3]], out: 2 }
]

tests.forEach((t, i) => console.log(
    'test', i, minimumTeachings(t.n, t.langs, t.fr) === t.out
))
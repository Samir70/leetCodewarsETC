/**
 * @param {number} n
 * @param {number} goal
 * @param {number} k
 * @return {number}
 */
const base = 10 ** 9 + 7
const multMod = (a, b) => {
  let out = 0;
  while (b > 0) {
    if (b % 2) { out = (out + a) % base }
    a = (a + a) % base;
    b = b >> 1
  }
  return out
}
const key = (a, b) => [a, b].join(",")
var numMusicPlaylists = function (n, goal, k) {
  let memo = {}
  const helper = (uniqueSongsInList, listLength) => {
    // console.log("calculating:", {uniqueSongsInList, listLength})
    if (uniqueSongsInList === 0 && listLength === 0) { return 1 }
    if (uniqueSongsInList === 0 || listLength === 0) { return 0 }
    if (uniqueSongsInList > listLength) { return 0 }
    if (memo[key(uniqueSongsInList, listLength)] !== undefined) {
      return memo[key(uniqueSongsInList, listLength)]
    }
    // play a new song on all lists that are one shorter
    let numUnplayedSongs = n - (uniqueSongsInList - 1)
    let numNewPlaylists = multMod(numUnplayedSongs, helper(uniqueSongsInList - 1, listLength - 1))
    // replay a song on all lists that are one shorter
    let numSongsThatCanBeReplayed = uniqueSongsInList - k
    if (numSongsThatCanBeReplayed > 0) {
      numNewPlaylists += multMod(numSongsThatCanBeReplayed, helper(uniqueSongsInList, listLength - 1))
      numNewPlaylists %= base
    }
    // console.log({numNewPlaylists, uniqueSongsInList, listLength})
    memo[key(uniqueSongsInList, listLength)] = numNewPlaylists
    return numNewPlaylists
  }
  return helper(n, goal)
};

/**
 * Your music player contains n different songs. 
 * You want to listen to goal songs (not necessarily different) during your trip. 
 * To avoid boredom, you will create a playlist so that:

    Every song is played at least once.
    A song can only be played again only if k other songs have been played.

Given n, goal, and k, return the number of possible playlists that you can create. 
Since the answer can be very large, return it modulo 10^9 + 7.
0 <= k < n <= goal <= 100
 */

const tests = [
  { args: [3, 3, 1], out: 6 },
  { args: [3, 4, 1], out: 18 },
  { args: [3, 4, 0], out: 36 },
  { args: [3, 5, 1], out: 42 },
  { args: [3, 5, 0], out: 150 },
  { args: [3, 6, 1], out: 90 },
  { args: [3, 6, 0], out: 540 },
  { args: [3, 7, 1], out: 186 },
  { args: [3, 7, 0], out: 1806 },
  { args: [3, 8, 1], out: 378 },
  { args: [3, 8, 0], out: 5796 },
  { args: [2, 3, 0], out: 6 },
  { args: [2, 3, 1], out: 2 },
  { args: [2, 20, 1], out: 2 },
  { args: [3, 20, 1], out: 1572858 },
  { args: [1, 2, 0], out: 1 },
  { args: [86, 100, 7], out: 776626822 },
];

tests.forEach((t, i) => {
  // if (i !== 0) { return }
  let res = numMusicPlaylists(...t.args);
  if (res !== t.out) {
    console.log(
      'test', i, 'should be', t.out, ' got ', res
    )
  } else {
    console.log('test', i, 'was correct!')
  }
});
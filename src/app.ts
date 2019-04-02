import hash from 'object-hash';

export const createHashArray = (s: string) => {
  return s.toLowerCase()
    .split(" ")
    .map(word => hash(word));
}

export const calculateEditDistance = (incoming: string, expected: string) => {
  if (incoming.length === 0 || expected.length === 0) return Math.max(incoming.length, expected.length);

  let [incomingHashes, expectedHashes] = [createHashArray(incoming), createHashArray(expected)];
  let [length, height] = [incomingHashes.length, expectedHashes.length];

  let dp = initializeArray(height, length);

  for (let column = 0; column < height; column++) {
    for (let row = 0; row < length; row++) {
      if (column === 0 && row === 0) {
        dp[column][row] = (incomingHashes[0] === expectedHashes[0]) ? 0 : 1;
      } else if (row === 0) {
        dp[column][row] = dp[column - 1][0] + ((incomingHashes[row] === expectedHashes[column]) ? 0 : 1);
      } else if (column === 0) {
        dp[column][row] = dp[0][row - 1] + ((incomingHashes[row] === expectedHashes[column]) ? 0 : 1);
      } else {
        dp[column][row] =
          Math.min(
            (dp[column - 1][row] + 1),
            (dp[column][row - 1] + 1),
            (dp[column - 1][row - 1] + (incomingHashes[row] === expectedHashes[column] ? 0 : 1))
          )
      }
    }
  }
  return dp[height - 1][length - 1];
}

const initializeArray = (length, height) => {
  let dp: number[][] = [];
  for (let i = 0; i < length; i++) {
    dp.push([]);
    for (let j = 0; j < height; j++) {
      dp[i].push(-1);
    }
  }
  return dp;
}

export const wordErrorRate = (incoming: string, expected: string) => {
  const editDistance = calculateEditDistance(incoming, expected);
  const score = editDistance / Math.max(incoming.split(" ").length, expected.split(" ").length);
  return score;
}

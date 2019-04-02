import { calculateEditDistance, wordErrorRate } from "./app";

console.log(calculateEditDistance("one hen", "won hen")); // => 1
console.log(wordErrorRate("one hen", "won hen")); // => 0.5

console.log(calculateEditDistance("one hen two ducks", "won hen too ducts")); // => 3
console.log(wordErrorRate("one hen two ducks", "won hen too ducts")); // => 0.25
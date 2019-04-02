# word-error-rate

This package scores a speech recognition service's recognition quality. It calculates Levenshtein Edit Distance on a per word basis, since speech recognition services will never misspell a word. If, for example, is given an audio file that says "one coconut" and mishears "won coconut", the edit distance it will calculate will be 1. If we were instead calculating edit distance on a per-character basis, it would have calculated a distance of 2 (the number of transformations necessary to turn "won" into "one"). This package also surfaces a function to calculate word error rate, which can be described formulaically as: `editDistance(utterance1, utterance2)/maxLength(utterance1, utterance2)`. This allows to generate a normalized error rate across different recognition models. 

## Usage

```cmd
npm install word-error-rate
```

### JavaScript
```js
const speechScorer = require("word-error-rate");
speechScorer.calculateEditDistance("one hen", "won hen"); // => 1
speechScorer.wordErrorRate("one hen", "won hen"); // => 0.5

speechScorer.calculateEditDistance("one hen two ducks", "won hen too ducts"); // => 3
speechScorer.wordErrorRate("one hen two ducks", "won hen too ducts"); // => 0.75
```

### TypeScript

```ts
import { calculateEditDistance, wordErrorRate } from "word-error-rate";

calculateEditDistance("one hen", "won hen"); // => 1
wordErrorRate("one hen", "won hen"); // => 0.5

calculateEditDistance("one hen two ducks", "won hen too ducts"); // => 3
wordErrorRate("one hen two ducks", "won hen too ducts"); // => 0.75
```
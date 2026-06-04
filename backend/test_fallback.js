const { getFallbackChallengeByTopicId } = require('./data/cProgrammingChallengeFallbacks');
const challenge = getFallbackChallengeByTopicId('c-p10-t3');
console.log(challenge.test_input);

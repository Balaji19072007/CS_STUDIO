const normalizeOutput = (str) => { return str ? str.toString().trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/[ \t]+$/gm, '') : ''; };
const actual = normalizeOutput('File Name: exec_123.c\nCompilation Date: Jun  1 2026');
const expected = normalizeOutput('File Name: [File]\nCompilation Date: [Date]');
const filePattern = '(.+)';
const datePattern = '(.+)';
const escapedExpected = expected
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  .replace(/\\\[File\\\]/g, filePattern)
  .replace(/\\\[Date\\\]/g, datePattern);
const regex = new RegExp('^' + escapedExpected + '$', 'i');
console.log(escapedExpected);
console.log(regex.test(actual));

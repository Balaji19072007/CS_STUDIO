class TestEvaluationService {
  constructor() {
    this.comparisonMethods = [
      'exact',
      'trimmed',
      'whitespaceInsensitive',
      'numeric',
      'floatingPoint'
    ];
  }

  /**
   * Compare actual output with expected output
   */
  compareOutputs(actualOutput, expectedOutput, language = '') {
    // Handle null/undefined outputs
    if (!actualOutput && !expectedOutput) {
      return { passed: true, matchType: 'both_empty' };
    }

    if (!actualOutput) {
      return {
        passed: false,
        matchType: 'none',
        difference: 'Actual output is empty or null'
      };
    }

    if (!expectedOutput) {
      return {
        passed: false,
        matchType: 'none',
        difference: 'Expected output is empty or null'
      };
    }

    // Clean both outputs
    const cleanedActual = this.cleanOutput(actualOutput);
    const cleanedExpected = this.cleanOutput(expectedOutput);

    // Try different comparison methods in order of strictness
    const results = [
      this.compareExact(cleanedActual, cleanedExpected),
      this.compareTrimmed(cleanedActual, cleanedExpected),
      this.compareLineTrimmed(cleanedActual, cleanedExpected),
      this.compareCaseInsensitive(cleanedActual, cleanedExpected),
      this.compareWhitespaceInsensitive(cleanedActual, cleanedExpected),
      this.compareNumeric(cleanedActual, cleanedExpected),
      this.compareFloatingPoint(cleanedActual, cleanedExpected, 1e-6),
      this.compareContains(cleanedActual, cleanedExpected) // Relaxed check: allows extraneous prompts
    ];

    // Find the first passing comparison
    for (let result of results) {
      if (result.passed) {
        return result;
      }
    }

    // If all comparisons failed, return the most detailed one
    return {
      passed: false,
      matchType: 'none',
      difference: this.generateDifference(cleanedActual, cleanedExpected)
    };
  }

  /**
   * Exact string comparison
   */
  compareExact(actual, expected) {
    const passed = actual === expected;
    return {
      passed,
      matchType: passed ? 'exact' : 'none',
      difference: passed ? '' : `Exact match failed`
    };
  }

  /**
   * Trimmed comparison (ignores leading/trailing whitespace)
   */
  compareTrimmed(actual, expected) {
    const trimmedActual = actual.trim();
    const trimmedExpected = expected.trim();
    const passed = trimmedActual === trimmedExpected;

    return {
      passed,
      matchType: passed ? 'trimmed' : 'none',
      difference: passed ? '' : `Trimmed comparison failed`
    };
  }

  /**
   * Line-trimmed comparison (trims each line individually)
   */
  compareLineTrimmed(actual, expected) {
    const actualLines = actual.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const expectedLines = expected.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const passed = actualLines.length === expectedLines.length && actualLines.every((line, i) => line === expectedLines[i]);

    return {
      passed,
      matchType: passed ? 'line_trimmed' : 'none',
      difference: passed ? '' : `Line-trimmed comparison failed`
    };
  }

  /**
   * Case insensitive comparison
   */
  compareCaseInsensitive(actual, expected) {
    const lowerActual = actual.toLowerCase();
    const lowerExpected = expected.toLowerCase();
    const passed = lowerActual === lowerExpected;

    return {
      passed,
      matchType: passed ? 'case_insensitive' : 'none',
      difference: passed ? '' : `Case-insensitive comparison failed`
    };
  }

  /**
   * Whitespace insensitive comparison
   */
  compareWhitespaceInsensitive(actual, expected) {
    const normalizedActual = actual.replace(/\s+/g, ' ').trim();
    const normalizedExpected = expected.replace(/\s+/g, ' ').trim();
    const passed = normalizedActual === normalizedExpected;

    return {
      passed,
      matchType: passed ? 'whitespace_insensitive' : 'none',
      difference: passed ? '' : `Whitespace-insensitive comparison failed`
    };
  }

  /**
   * Numeric comparison (for numeric outputs)
   */
  compareNumeric(actual, expected) {
    const actualNum = parseFloat(actual);
    const expectedNum = parseFloat(expected);

    if (isNaN(actualNum) || isNaN(expectedNum)) {
      return { passed: false, matchType: 'none', difference: 'Not numeric values' };
    }

    const passed = actualNum === expectedNum;
    return {
      passed,
      matchType: passed ? 'numeric' : 'none',
      difference: passed ? '' : `Numeric values differ: ${actualNum} vs ${expectedNum}`
    };
  }

  /**
   * Floating point comparison with tolerance
   */
  compareFloatingPoint(actual, expected, tolerance = 1e-6) {
    const actualNum = parseFloat(actual);
    const expectedNum = parseFloat(expected);

    if (isNaN(actualNum) || isNaN(expectedNum)) {
      return { passed: false, matchType: 'none', difference: 'Not floating point values' };
    }

    const diff = Math.abs(actualNum - expectedNum);
    const passed = diff <= tolerance;

    return {
      passed,
      matchType: passed ? 'floating_point' : 'none',
      difference: passed ? '' : `Floating point values differ: ${actualNum} vs ${expectedNum} (diff: ${diff})`
    };
  }

  /**
   * Contains comparison (checks if expected output is a substring of actual output)
   * This is useful when the user adds prompts ("Enter number: ") that are not in the expected output.
   */
  compareContains(actual, expected) {
    const normalizedActual = actual.replace(/\s+/g, ' ').trim();
    const normalizedExpected = expected.replace(/\s+/g, ' ').trim();

    // Only allow this if expected output is not trivially short to avoid false positives
    if (normalizedExpected.length < 2) {
      return { passed: false, matchType: 'none', difference: 'Expected output too short for lenient match' };
    }

    const passed = normalizedActual.includes(normalizedExpected);

    return {
      passed,
      matchType: passed ? 'contains_substring' : 'none',
      difference: passed ? '' : `Actual output does not contain expected output`
    };
  }

  /**
   * Generate detailed difference report
   */
  generateDifference(actual, expected) {
    const actualLines = actual.split('\n');
    const expectedLines = expected.split('\n');

    if (actualLines.length !== expectedLines.length) {
      return `Line count mismatch: got ${actualLines.length}, expected ${expectedLines.length}`;
    }

    for (let i = 0; i < actualLines.length; i++) {
      if (actualLines[i] !== expectedLines[i]) {
        return `Line ${i + 1} mismatch:\nGot:      "${actualLines[i]}"\nExpected: "${expectedLines[i]}"`;
      }
    }

    return 'Unknown difference';
  }

  /**
   * Clean output for comparison
   */
  cleanOutput(output) {
    if (typeof output !== 'string') {
      return String(output);
    }

    return output
      .replace(/\\n/g, '\n')       // Unescape literal \n to actual newline
      .replace(/\r\n/g, '\n')      // Normalize Windows line endings
      .replace(/\r/g, '\n')        // Normalize Mac line endings
      .replace(/[\t ]+\n/g, '\n')  // Remove trailing spaces before newlines
      .trim();                     // Remove leading/trailing spaces from the whole string
  }

  /**
   * Validate test case format
   */
  validateTestCase(testCase) {
    const errors = [];

    if (!testCase.input && testCase.input !== '') {
      errors.push('Input is required');
    }

    if (!testCase.expectedOutput && !testCase.output) {
      errors.push('Expected output or output is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = TestEvaluationService;
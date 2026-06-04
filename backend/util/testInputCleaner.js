/**
 * Utility to extract clean input values from formatted test case inputs
 * 
 * Many test cases are formatted like:
 * "Enter first integer: 15\nEnter second integer: 7"
 * 
 * But programs expect just:
 * "15\n7"
 * 
 * This service extracts the actual input values.
 */

class TestInputCleaner {
    /**
     * Extract actual input values from formatted test input
     * @param {string} formattedInput - Input that may contain prompts
     * @param {string} language - Programming language (affects how we clean)
     * @returns {string} - Clean input with just the values
     */
    static cleanTestInput(formattedInput, language = 'java') {
        if (!formattedInput) return '';

        // Split by newlines
        const lines = formattedInput.split('\n');
        const cleanedLines = [];

        for (const line of lines) {
            // Check if line contains a colon (typical prompt format)
            if (line.includes(':')) {
                // Extract everything after the last colon
                const parts = line.split(':');
                const value = parts[parts.length - 1].trim();

                // Only add if there's an actual value
                if (value) {
                    cleanedLines.push(value);
                }
            } else {
                // No colon, assume it's already clean input
                const trimmed = line.trim();
                if (trimmed) {
                    cleanedLines.push(trimmed);
                }
            }
        }

        return cleanedLines.join('\n');
    }

    /**
     * Check if input appears to be formatted (contains prompts)
     * @param {string} input
     * @returns {boolean}
     */
    static isFormattedInput(input) {
        if (!input) return false;

        // Common prompt patterns
        const promptPatterns = [
            /Enter\s+\w+.*:/i,
            /Input\s+\w+.*:/i,
            /Please\s+enter.*:/i,
            /Provide.*:/i
        ];

        return promptPatterns.some(pattern => pattern.test(input));
    }
}

module.exports = TestInputCleaner;

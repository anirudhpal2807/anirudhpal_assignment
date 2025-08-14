/**
 * Normalizes a string by converting to lowercase and removing accents
 */
export const normalizeName = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
};

/**
 * Calculates the edit distance between two strings
 */
const editDistance = (a: string, b: string): number => {
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(0));
  
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,     // deletion
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }
  
  return matrix[a.length][b.length];
};

/**
 * Checks if two strings match with fuzzy matching (allows 1 edit)
 */
export const isFuzzyMatch = (query: string, text: string): boolean => {
  const normalizedQuery = normalizeName(query);
  const normalizedText = normalizeName(text);
  
  // Exact match
  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }
  
  // Check if edit distance is 1 or less
  const distance = editDistance(normalizedQuery, normalizedText);
  if (distance <= 1) {
    return true;
  }
  
  // Check if query is a subsequence with at most 1 edit
  // This handles cases like "rvi" matching "ravi"
  let queryIndex = 0;
  let edits = 0;
  
  for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
    if (normalizedText[i] === normalizedQuery[queryIndex]) {
      queryIndex++;
    } else if (edits === 0) {
      edits++;
      // Try skipping character in text (deletion)
      if (i + 1 < normalizedText.length && normalizedText[i + 1] === normalizedQuery[queryIndex]) {
        queryIndex++;
        i++; // Skip the next character as we matched it
      }
      // Try skipping character in query (insertion)
      else if (queryIndex + 1 < normalizedQuery.length && normalizedText[i] === normalizedQuery[queryIndex + 1]) {
        queryIndex += 2;
      }
      // Substitution - just continue
      else {
        queryIndex++;
      }
    }
  }
  
  // Allow for one missing character at the end
  return queryIndex >= normalizedQuery.length - 1;
};

/**
 * Runs built-in tests for the fuzzy search functionality
 */
export const runFuzzySearchTests = (): string => {
  const tests = [
    {
      name: 'normalizeName("José") === "jose"',
      test: () => normalizeName("José") === "jose"
    },
    {
      name: 'normalizeName("JOSE") === "jose"',
      test: () => normalizeName("JOSE") === "jose"
    },
    {
      name: 'isFuzzyMatch("rvi", "ravi") === true',
      test: () => isFuzzyMatch("rvi", "ravi") === true
    },
    {
      name: 'isFuzzyMatch("cse2025-01", "CSE2025-001") === true',
      test: () => isFuzzyMatch("cse2025-01", "CSE2025-001") === true
    },
    {
      name: 'isFuzzyMatch("ana", "arun") === false',
      test: () => isFuzzyMatch("ana", "arun") === false
    }
  ];
  
  let allPassed = true;
  const results: string[] = [];
  
  tests.forEach(({ name, test }) => {
    try {
      const passed = test();
      console.assert(passed, `Test failed: ${name}`);
      results.push(`✓ ${name}: ${passed ? 'PASSED' : 'FAILED'}`);
      if (!passed) allPassed = false;
    } catch (error) {
      results.push(`✗ ${name}: ERROR - ${error}`);
      allPassed = false;
    }
  });
  
  const summary = allPassed ? '🎉 All tests passed!' : '❌ Some tests failed';
  return `${summary}\n\n${results.join('\n')}`;
};
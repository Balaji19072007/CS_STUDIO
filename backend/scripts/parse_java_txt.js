const fs = require('fs');

const text = fs.readFileSync('../notes/java.txt', 'utf8');
const lines = text.split(/\r?\n/);

let phases = [];
let currentPhase = null;
let currentTopic = null;
let currentSection = null;
let currentSectionContent = [];

function flushSection() {
    if (currentSection && currentTopic) {
        currentTopic[currentSection] = currentSectionContent.join('\n').trim();
    }
    currentSectionContent = [];
}

function flushTopic() {
    flushSection();
    if (currentTopic && currentPhase) {
        currentPhase.topics.push(currentTopic);
    }
    currentTopic = null;
}

function flushPhase() {
    flushTopic();
    if (currentPhase) {
        phases.push(currentPhase);
    }
    currentPhase = null;
}

const sectionHeaders = [
    'Topic Introduction', 'Definition', 'Syntax', 'Example 1', 'Example 2', 'Example 3', 'Output',
    'Common Mistakes', 'Best Practices', 'Key Points', 'Problem Statement', 'Input Format', 
    'Output Format', 'Sample Input', 'Sample Output', 'Constraints', 'Hint 1', 'Hint 2', 'Hint 3',
    'Code Editor', 'Solution Code', 'Code Explanation', 'Why We Need'
];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trimRight();
    const tline = line.trim();

    if (tline.match(/^Phase \d+:/)) {
        flushPhase();
        currentPhase = { title: tline, topics: [] };
        currentSection = 'Phase Introduction';
        continue;
    }

    if (tline.match(/^Topic \d+:/) && !tline.includes('Mastery Challenge') && !tline.includes('Quiz')) {
        flushTopic();
        currentTopic = { title: tline };
        currentSection = null;
        continue;
    }
    
    if (tline.match(/^Topic \d+ Mastery Challenge/)) {
        flushSection();
        currentSection = 'Mastery Challenge Intro';
        continue;
    }

    let isSectionHeader = false;
    for (const h of sectionHeaders) {
        if (tline === h || (tline.startsWith(h) && h.includes('Example')) || tline.startsWith('Why We Need')) {
            flushSection();
            currentSection = h;
            isSectionHeader = true;
            break;
        }
    }
    if (isSectionHeader) continue;

    if (currentSection) {
        currentSectionContent.push(line);
    }
}
flushPhase();

fs.writeFileSync('java_data.json', JSON.stringify(phases, null, 2));
console.log('Saved java_data.json. Total phases:', phases.length);

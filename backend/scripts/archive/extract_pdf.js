const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('notes/C_notes.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('notes/C_notes_extracted.txt', data.text);
    console.log('Extraction complete. Saved to notes/C_notes_extracted.txt');
    console.log('Total pages:', data.numpages);
}).catch(function(err) {
    console.error('Error extracting PDF:', err);
});

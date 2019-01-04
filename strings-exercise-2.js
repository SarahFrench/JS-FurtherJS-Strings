
const https = require('https');
const fs = require('fs');

const options = {
    protocol: 'https:',
    host: 'en.wikipedia.org',
    path: '/wiki/Unicode'
};

const request = https.request(options, responseStream => {
    let htmlText = '';
    responseStream.on('data', chunk => {
        htmlText += chunk;
    });
    responseStream.on('end', () => {
        writeToFile('./Unicode.1.html', '\uFEFF' + htmlText, 'utf16le');

        const fileText = readFromFile('./Unicode.1.html', 'utf16le');
        writeToFile('./Unicode.2.html', fileText.slice(1), 'utf16le');

        const finalText = readFromFile('./Unicode.2.html', 'utf8');
        writeToFile('./Unicode.3.html', '\uFEFF' + finalText, 'utf16le');

        const sarahText = readFromFile('./Unicode.1.html', 'utf16le');
        writeToFile('./Unicode.4.html', '\uFFFE' + sarahText, 'utf16le');

        const sarahText2 = '<'
        writeToFile('./Unicode.5.html', '\uFEFF' + sarahText2, 'utf8');
        writeToFile('./Unicode.6.html', '\uFFFE' + sarahText2, 'utf8');
        writeToFile('./Unicode.7.html', '\uFFFE' +htmlText, 'binary');
    });
});

request.on('error', function (e) {
    console.error(e.message);
});

request.end();

function writeToFile(filePath, text, encoding) {
    fs.writeFileSync(filePath, text, { encoding: encoding });
}

function readFromFile(filePath, encoding) {
    return fs.readFileSync(filePath, { encoding: encoding });
}

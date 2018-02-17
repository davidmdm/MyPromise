'use strict';

const Promise = require('./promise');
const fs = require('fs');

new Promise(resolve => {
    fs.readFile('./text.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        resolve(data);
    });
})
    .then(text => text.split('\n'))
    .then(lines => lines.map((x, i) => `${i + 1}: ${x}`))
    .then(lines => lines.join('\n'))
    .then(console.log);


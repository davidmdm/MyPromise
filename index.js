'use strict';

const Promise = require('./promise');
const fs = require('fs');

// new Promise(resolve => {
//     fs.readFile('./text.txt', 'utf8', (err, data) => {
//         if (err) {
//             throw err;
//         }
//         resolve(data);
//     });
// })
//     .then(text => text.split('\n'))
//     .then(lines => lines.map((x, i) => `${i + 1}: ${x}`))
//     .then(lines => lines.join('\n'))
//     .then(text => new Promise(resolve => setTimeout(() => resolve(text), 1000)))
//     .then(console.log);

const p1 = new Promise(resolve => setTimeout(resolve, 500, 'hello'));
const p2 = new Promise(resolve => setTimeout(resolve, 99, ' world'));

Promise.all([p1, p2])
    .then(results => results.join(''))
    .then(console.log);

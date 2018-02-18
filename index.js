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

Promise.resolve()
   .then(() => Promise.reject("i am rejected"))
   .then(() => console.log('Yolo'))
   .then(() => console.log('bird'))
   .catch(err => console.log(err));



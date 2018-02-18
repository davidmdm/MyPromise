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





new Promise(resolve => setTimeout(resolve, 1000, 'Hello'))
    .then(x => {
        console.log(x);
        return new Promise((_, reject) => reject("world"))

    })
    .then(() => {
      console.log('This should never be reached');
    })
    .catch(err => {
        console.log(err);
    });

// new Promise((_, reject) => {
//     reject(new Error('I was thrown on purpose'));
// })
    // .catch(console.error)
    // .then(() => console.log('But the program lives'));
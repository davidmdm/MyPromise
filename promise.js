'use strict';

module.exports = class MyPromise {

  constructor(fn) {

    this.state = 'pending';
    this.chain = [];

    const resolve = (value) => {
      process.nextTick(() => {
        this.state = 'resolved';
        this.value = value;
        this.chain.forEach(fn => fn(this.value));
      })
    };

    fn(resolve);

  }

  then(fn) {
    
    if (this.state === 'pending') {
      return new MyPromise(resolve => {
        this.chain.push(x => {
          const value = fn(x);
          if (value instanceof MyPromise) {
            value.then(resolve);
          } else {
            resolve(value);
          }
        });
      });
    } 

    if (this.state === 'resolved') {
      return new MyPromise(resolve => resolve(fn(this.value)));
    }
  }

}

'use strict';

module.exports = class MyPromise {

  constructor(fn) {

    this.state = 'pending';
    this.chain = [];
    this.failChain = [];

    const resolve = (value) => {
      process.nextTick(() => {
        this.state = 'resolved';
        this.value = value;
        this.chain.forEach(fn => fn(this.value));
      });
    };

    const reject = (err) => {
      process.nextTick(() => {
        this.state = 'rejected';
        this.error = err;
        if (this.errorHandler) {
          this.value = this.errorHandler(this.error);
          this.chain.forEach(fn => fn(this.value));
        } else if (this.failChain.length > 0) {
          this.failChain.forEach(fn => fn(this.error));
        } else {
          throw this.error;
        }
      });
    };

    fn(resolve, reject);

  }

  then(fn) {

    if (this.state === 'pending') {
      return new MyPromise((resolve, reject) => {
        
        this.chain.push(x => {
          try {
            const value = fn(x);
            if (value instanceof MyPromise) {
              value.then(resolve).catch(reject);
            } else {
              resolve(value);
            }
          } catch (err) {
            reject(err);
          }
        });
        
        this.failChain.push(err => reject(err));
        
      });
    }

    if (this.state === 'resolved') {
      return new MyPromise(resolve => resolve(fn(this.value)));
    }

    if (this.state === 'rejected') {
      return new MyPromise((_, reject) => reject(this.error));
    }
  }

  catch(fn) {
    this.errorHandler = fn;
    return this;
  }
  
  static resolve(val) {
    return new Promise(resolve => resolve(val));
  }

  static reject(val) {
    return new Promise((_, reject) => reject(val));
  }

}

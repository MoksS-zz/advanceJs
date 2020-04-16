"use strict"

function allKeysAndSymbols (object) {
  const descriptors = Object.getOwnPropertyDescriptors(Object.prototype);
  let result = Object.keys(descriptors)
  let proto = obj;
  while(proto !== null) {
    const symbol = Object.getOwnPropertySymbols(proto);
    const properties = Object.keys(Object.getOwnPropertyDescriptors(proto));
    result = [...result, ...properties, ...symbol];
    proto = proto.__proto__ 
  }

  result =  new Set(result);
  return result;
}

const protObj = {
  a: 123
}

Object.defineProperty(protObj, "orange",  { 
  value: '🍊', 
  configurable: true,
  enumerable: false
});

const s0 = Symbol.for('orange');
protObj[s0] = '🍊[2]';

// console.log(Object.getOwnPropertyDescriptors(protObj));

Object.setPrototypeOf(protObj, {a:1, b:123, c:123});
// console.log(protObj.__proto__);
const obj = Object.create(protObj);

Object.defineProperty(obj, "apple",  { 
  value: '🍎', 
  configurable: true,
  enumerable: false
});

const s1 = Symbol.for('apple');
obj[s1] = '🍎[2]'

const result = allKeysAndSymbols(obj) // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", ... ]
console.log(result);
class MySet {
  constructor(iterable) {
    this.items = {}
    this.size = 0; 
    for (const el of iterable) {
      this.add(el)
    }
  }

  [Symbol.iterator]() {
    const arr = Object.keys(this.items);
    return {
      current: 0,
      last: arr.length - 1,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: arr[this.current++] };
        } else {
          return { done: true };
        }
      }
    }
  }

  valueOf() {
    return this;
  }

  get [Symbol.toStringTag]() {
    return 'MySet';
  }

  has(value) {
    let key = value;
    if (typeof value == "object" && value !== null) {
      key = value.SymbolCheck  || "123123asdasd123123asd";
      if(key === "123123asdasd123123asd") return false;
    }
    
    return this.items.hasOwnProperty(key);
  }

  add(value) {
    let key = value;
    if (typeof value == "object" && value !== null) {
      if (value.SymbolCheck === undefined) {
        value.SymbolCheck = Symbol("id");
      }

      key = value.SymbolCheck;
    }

    if (!this.has(value)) {
      this.items[key] = value;
      this.size++;
      return true;
    }
    return false;
  }

  delete(value) {
    let key = value;
    if (typeof value == "object" && value !== null) {
      key = value.SymbolCheck  || "123123asdasd123123asd";
      if (key === "123123asdasd123123asd") return false;
    }

    if (this.has(value)) {
      delete this.items[key];
      return true;
    }
    return false;
  }

  clear() {
    this.items = {};
    this.size = 0;
  }

  keys() {
    return Object.keys(this.items);
  }

  entries() {
    return Object.entries(this.items);
  }

  value() {
    return Object.value(this.items);
  }
}

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
  console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
  console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}
// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
  getValue () { return this.value }
}

const data = {
  value: 42
}

// есть метод add
set.add(object);
set.add(data);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object MySet]
console.log(Object.prototype.toString.call(set)) // [object MySet]

// // задание со звездочкой *
// // есть forEach, который делает какие-то странные вещи...
// set.forEach(function (item) {
//   console.log(item.getValue.call(this)); // 42
// }, data);
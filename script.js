if (index < 0 || index >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + (key.charCodeAt(i) % this.capacity);
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    const entry = { key: key, value: value };

    //empty bucket
    if (this.buckets[index] === null) {
      this.buckets[index] = entry;
      this.size++;

      if (this.size / this.capacity >= this.loadFactor) {
        this.grow();
      }
    }
    //already exists?
    else if (this.buckets[index].key === key) {
      this.buckets[index].value = value;
    }

    //collision
    else {
      console.log("Warning: collision occured!");
    }
  }

  grow() {
    const oldBuckets = this.buckets;

    this.capacity *= 2;

    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;

    for (let bucket of oldBuckets) {
      if (bucket !== null) {
        this.set(bucket.key, bucket.value);
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    if (this.buckets[index] === null) {
      return null;
    }

    if (this.buckets[index].key === key) {
      return this.buckets[index].value;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (this.buckets[index] === null) {
      return false;
    }
    return this.buckets[index].key === key;
  }

  remove(key) {
    const index = this.hash(key);

    if (this.buckets[index] !== null && this.buckets[index].key === key) {
      this.buckets[index] = null;
      this.size--;
      return true;
    }
    return false;
  }

  length() {}

  clear() {}

  keys() {}

  values() {}

  entries() {}
}

function set(key, value) {}

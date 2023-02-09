//Задача № 1
  class Cache extends Map {
  maxSize = 10;

  set() {
    if (this.size >= this.maxSize) { 
      this.shift()
    }
    super.set.apply(this, arguments)
  }

  shift() {
    const first = [...this.entries()][0];
    this.delete(first[0]);
    return first
  }

  pop() {
    const last = [...this.entries()][this.size - 1];
    this.delete(last[0]);
    return last
  }

}

function cachingDecoratorNew(func, hashFunc = md5, maxSize = 5) {
  let cache = new Cache();
  cache.maxSize = maxSize;
function wrapper(...args) {
    const hash = hashFunc(args);
  let fromCache = true;
    if (!cache.has(hash)) {
        fromCache = false;
        cache.set(hash, func.call(this, ...args))
    }

  const result = (fromCache ? 'Из кэша: ' : 'Вычисляем: ') + cache.get(hash);
    console.log(result);
    return result
}
return wrapper;
}

//Задача № 2

function debounceDecoratorNew(func, delay) {
  let timerId = null;
  const run = ()=>{
    timerId = setTimeout(() => timerId = null, delay);
      func.apply(this, arguments);
      wrapper.count++;
  }
  function wrapper() {
    wrapper.allCount++;
    if (timerId) {
      clearTimeout(timerId);
      timerId = setTimeout(run, delay);
      return
    }
    run()
  }
  wrapper.count = 0;
  wrapper.allCount = 0;
  return wrapper
}
// 其实是节流
export function debounce(fn, duration, ...args) {
  let debounce = false;
  return function () {
    if (!debounce) {
      debounce = true;
      const context = this;
      setTimeout(() => {
        // 否则debounce会丢失执行上下文
        fn.apply(context, ...args);
        debounce = false;
      }, duration)
    }

  }
}

let count = 0;
const onclick = debounce(() => {
  console.log('click', count)
}, 2000)
setInterval(() => { onclick(); count++ }, 10)




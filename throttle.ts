// 其实是防抖
export function throttle(fn, duration) {
  let id;
  return function () {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(fn, duration);
  }
}

let count = 0;
const onclick = throttle(() => {
  console.log('click', count)
}, 500)


const id = setInterval(() => { onclick(); count++ }, 800)
const id2 = setInterval(() => { onclick(); count++ }, 1200)
setTimeout(() => {
  clearInterval(id)
  clearInterval(id2)
}, 15000);

clearInterval(id)
clearInterval(id)

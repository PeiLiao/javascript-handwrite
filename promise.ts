class MyPromise {

  status: 'fulfilled' | 'pending' | 'rejected';
  result = null
  error = null
  onFulfilledList = []
  onRejectedList = []
  constructor(fn) {

    this.status = 'pending';
    let ctx = this;
    let resolve = (data) => {
      // 多次resolve无效
      if (ctx.status !== 'pending') {
        return;
      }
      ctx.status = 'fulfilled';
      ctx.result = data;
      ctx.onFulfilledList.forEach(onFulfilled => {
        setTimeout(() => {
          onFulfilled(data)
        }, 0)
      });
    }

    let reject = (err) => {
      if (ctx.status !== 'pending') {
        return;
      }
      ctx.status = 'rejected';
      ctx.error = err;
      ctx.onRejectedList.forEach(onRejected => {

        setTimeout(() => {
          onRejected(err)
        }, 0)
      });
    }

    try {
      fn.call(this, resolve, reject)
    } catch (e) {
      reject(e)
    }

  }

  then(onFulfilled, onRejected?) {

    if (this.status === 'fulfilled') {
      onFulfilled(this.result)
      return MyPromise.resolve(this.result);
    }

    if (this.status === 'rejected') {
      if (onRejected) {
        onRejected(this.error)
      }

      return MyPromise.reject(this.error)
    }

    if (this.status === 'pending') {
      let ctx = this;
      const newPromise = new MyPromise((resolve, reject) => {
        ctx.onFulfilledList.push((result) => {
          try {
            const res = onFulfilled(result);
            resolve(res);
          } catch (e) {
            reject(e)
          }
        })

        ctx.onRejectedList.push((reason) => {
          try {
            resolve(onRejected(reason))
          } catch {
            reject(reason)
          }
        })
      })
      return newPromise;
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(p) {
    return new MyPromise((resolve) => {
      resolve(p)
    })
  }

  static reject(e) {
    return new MyPromise((resolve, reject) => {
      reject(e)
    })
  }
}
let p = new MyPromise((resolve) => {
  setTimeout(() => {
    console.log('ee')
    resolve('ee')
  }, 1000);

})

let p1 = p.then((res) => {
  console.log(4, res)
  return 'w4'
})
let p2 = p1.then((res) => {
  console.log(5, res)
  throw 'wrong'
  return 'w5'
})

let p3 = p2.then((res) => {
  console.log(6, res)
  return 'w6'
}, (e) => { console.log('hold', e); return 'catched' })

p3.then((res) => { console.log(7, res) }, (e) => { console.log('reject', e, p3) })

setTimeout(() => console.log(p, p1, p2, p3), 3000)

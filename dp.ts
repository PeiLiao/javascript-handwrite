// question 1
// return a subArray of [nums], make the sum of it largest
function maxSumSubArray(nums: number[]) {
  if (nums.length == 0) return 0;

  let p = nums[0];
  let max = p;
  let parr = [];
  let marr = []
  for (let i = 1; i < nums.length; i++) {

    let t = Math.max(p + nums[i], nums[i]);
    if ((p + nums[i]) <= nums[i]) {
      parr = [nums[i]]

    } else {
      parr.push(nums[i])
    }

    if (t > max) {
      max = t;
      marr = parr.concat();
    }

    p = t;
    console.log(max, p, nums[i])
  }
  console.log(marr)
  return max;
}

// return a subArray of [nums], make the product of it largest
function maxProductSubArray(nums: number[]) {
  if (nums.length == 0) return 0;

  let p1 = nums[0], p2 = nums[0];
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {

    console.log('current', nums[i])

    if (nums[i] < 0) {
      let t2 = p1 * nums[i]
      p1 = p2 * nums[i]
      p2 = t2
    } else {
      p1 = Math.max(p1 * nums[i], nums[i])
      p2 = p2 * nums[i]
    }

    max = Math.max(max, p1, p2);

    console.log(max, p1, p2)
  }
  return max;
}

// console.log(maxSumSubArray([-2, 1, -3, 1, -1, 3, 2, -5, 4, 4]))
// console.log(maxProductSubArray([2, 3, -1, 3, 2, -5, 4, 4, -1]))


// question 2
// devide [m] to [n] parts, e.g. n1,n2,n3...nk, then n1 + n2 + n3 + ... nk = m
// make n1*n2*n3*...*nk as larger as possible, return the value
// recursion version
function maxArea_recursion(m: number, n: number) {

  if (m < n || m < 2) {
    return -1;
  }

  if (n === m) {
    return 1;
  }

  if (n < 2) {
    return m;
  }

  return Math.max(...[...Array(m).keys()].map(k => k * maxArea_recursion(m - k, n - 1)))
}

// dynamic planning version, iteration n, more like recursion version
// actually we know that (m/n)^n will be the largest result(it's so sad we had a complicated try. )
function maxArea_dp_iter_n(m: number, n: number) {
  const dp: number[][] = [];
  for (let i = 1; i <= m; i++) {
    dp[i] = [];
    for (let j = 1; j <= n; j++) {
      if (j > i) {
        dp[i][j] = -1;
        continue;
      }
      if (i === 1) {
        dp[i][j] = 1;
        continue;
      }
      if (j === 1) {
        dp[i][j] = i;
        continue;
      }
      if (j === i) {
        dp[i][j] = 1;
        continue;
      }

      dp[i][j] = i;
      for (let k = 1; k < i; k++) {
        // j->j-1, that's why we said it iterates n
        dp[i][j] = Math.max(dp[i][j], k * dp[i - k][j - 1])
      }

    }
  }
  return dp[m][n]
}

// dynamic planning version, iteration m, is not recommended but workable in this question
// in general, m is a bit larger than n, result in this function more time-consuming than maxArea_dp_iter_n
// besides, it must be emphasized, cause this function won't try all possible solution, it maybe a wrong answer and works only for this question
function maxArea_dp_iter_m(m: number, n: number) {

  if (m < n) {
    return -1;
  }

  if (n === m) {
    return m;
  }

  const dp = Array(n).fill(1);

  for (let i = 1; i <= m - n; i++) {
    // it's a trick: adding 1 to the smallest section makes the product largest
    dp.sort();
    dp[0]++;

    // todo: try adding 1 to one element of dp to make the product of all elements largest
    // so you need to calculate for nth times to find which one to add 1


  }
  return dp.reduce((a, b) => a * b, 1)
}



// simplified version: when n is not specified
// or, the more nk equal to 3, the larger the product.
function maxArea_without_n(m: number, n?: number) {
  const dp: number[] = []
  dp[1] = 1;

  for (let i = 2; i <= m; i++) {
    dp[i] = i;
    for (let j = 1; j <= i / 2; j++) {
      dp[i] = Math.max(dp[i], dp[j] * dp[i - j])
    }
  }
  return dp[m]
}

// test
function testMaxArea(func) {
  console.log(func.name, 1, 1, func(1, 1))
  console.log(func.name, 2, 1, func(2, 1))
  console.log(func.name, 3, 2, func(3, 2))
  console.log(func.name, 3, 3, func(3, 3))
  console.log(func.name, 3, 4, func(3, 4))
  console.log(func.name, 4, 2, func(4, 2))
  console.log(func.name, 14, 3, func(14, 3))
  console.log(func.name, 18, 5, func(18, 5))
}
testMaxArea(maxArea_without_n)
testMaxArea(maxArea_dp_iter_n)
testMaxArea(maxArea_dp_iter_m)



// question3: max length of palindromes string
function palindromes(str: string) {

}

// question4: provided n1+n2+n3+...nk=n(1<=k<=n),return [n1,n2,n3,...,nk]
function permutation_of_n(n: number): number[][] {
  const dp = { 1: [[1]] }
  for (let i = 2; i <= n; i++) {
    dp[i] = [[i]]
    for (let j = 1; j <= i / 2; j++) {
      dp[i - j].forEach(arr => {
        const newArr = [j, ...arr]
        let repeat = false;
        dp[i].forEach(arr => {
          if (!repeat && arrayEqual(arr, newArr)) {
            repeat = true;
          }
        });
        if (!repeat) {
          dp[i].push(newArr)
        }
      });
    }
  }
  return dp[n];

}

// if k is specified
function permutation_of_n_k(n: number, k: number) {
  return permutation_of_n(n).filter((arr: number[]) => arr.length === k);
}


// console.log(permutation_of_n_k(8, 3))
// console.log(permutation_of_n(8))


// shallow diff two array, no matter the order
// use sorter
function arrayEqual(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// use filter, only for no-repeat arrays
// e.g. arrayEqual_filter([ 1, 1, 2 ], [2, 1, 3 ]) will return a wrong result [true]
function arrayEqual_filter(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return !!arr1.filter(t => !arr2.includes(t))
}



// question5: 0-1 backpack
// provided there is a backpack with a weight opacity of W 
// given N items of goods with weight wi and value vi , make w1+w2+...wk <= W, k<=N, v1+v2+...+vk to be largest
// recursion version, N start at w.length()
function backpack_recursion(W: number, N: number, w: number[], v: number[]) {
  if (W === 0 || N === 0) return 0;
  for (let i = N - 1; i >= 0; i--) {
    const q = backpack_recursion(W, N - 1, w, v);
    if (w[i] > W) {
      return q
    }
    return Math.max(q, backpack_recursion(W - w[i], N - 1, w, v) + v[i]);
  };
}

// dp version, N = w.length()
// iterate tn and consider whether to select [tn] when the capacity is [rw]
// and no matter whether [tn] is selected, there is a best answer of dp[tn][rw]
function backpack_dp_W(W: number, N: number, w: number[], v: number[]) {
  const dp = [[]];
  for (let i = 0; i < N + 1; i++) { dp[i] = []; dp[i][0] = 0; }
  for (let j = 0; j < W + 1; j++) { dp[0][j] = 0; }
  for (let tn = 1; tn < N + 1; tn++) {
    for (let rw = 1; rw < W + 1; rw++) {
      if (rw < w[tn - 1]) {
        dp[tn][rw] = dp[tn - 1][rw];
      } else {
        dp[tn][rw] = Math.max(dp[tn - 1][rw], dp[tn - 1][rw - w[tn - 1]] + v[tn - 1]);
      }
    }
  }
  return dp[N][W];
}


// given N <= w.length(), finally the number of items of selected goods must be smaller than N
function backpack_dp_W_N(W: number, N: number, w: number[], v: number[]) {
  const dp = [];
  for (let i = 0; i <= w.length; i++) {
    dp[i] = [];
    for (let k = 0; k <= W; k++) {
      dp[i][k] = [];
      for (let n = 0; n <= N; n++) {
        if (i === 0 || k === 0 || n === 0) {
          dp[i][k][n] = 0
          continue
        }
        if (k < w[i - 1]) {
          dp[i][k][n] = dp[i - 1][k][n];
          continue
        }
        dp[i][k][n] = Math.max(dp[i - 1][k][n], dp[i - 1][k - w[i - 1]][n - 1] + v[i - 1])

      }
    };
  }
  return dp[w.length][W][N];
}

// the number of items is not specified and each item can be selected more than one time
function backpack_dp_W_repeat(W: number, w: number[], v: number[]) {
  const dp = [];
  for (let i = 0; i <= w.length; i++) {
    dp[i] = [];
    for (let k = 0; k <= W; k++) {
      dp[i][k] = [];
      if (i === 0 || k === 0) {
        dp[i][k] = 0
        continue
      }
      if (k < w[i - 1]) {
        dp[i][k] = dp[i - 1][k];
        continue
      }
      dp[i][k] = Math.max(dp[i - 1][k], dp[i - 1][k - w[i - 1]] + v[i - 1])
    };
  }
  return dp[w.length][W];
}



const wi = [2, 3, 1, 4, 2, 6, 5, 2];
const vi = [4, 5, 2, 8, 3, 11, 9, 4];

function testBackpack(func) {
  console.log(func(20, 8, wi, vi))
}
// testBackpack(backpack_recursion)
// testBackpack(backpack_dp_W)
// console.log(backpack_dp_W_N(20, 3, wi, vi))

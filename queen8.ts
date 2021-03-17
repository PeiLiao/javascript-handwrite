let res = {};
let total = 0, tried = 0;
function queen(depth: number, n: number) {

  if (depth > n) {
    console.log(res)
    total++
    return;
  }

  for (let i = 1; i <= n; i++) {
    // 清除上次递归数据
    for (let i = depth; i <= n; i++) {
      delete res[i]
    }

    const isSameCol = Object.values(res).includes(i)
    const isSameRightDiagonal = Object.keys(res).map((l) => Number(res[l]) - Number(l)).includes(i - depth);
    const isSameLeftDiagonal = Object.keys(res).map((l) => Number(res[l]) + Number(l)).includes(depth + i);
    tried++
    if (!isSameCol && !isSameRightDiagonal && !isSameLeftDiagonal) {
      res[depth] = i;
      queen(depth + 1, n)
    }
  }
}
let start = Date.now()
queen(1, 8)
let end = Date.now()
console.log(total, tried, end - start)
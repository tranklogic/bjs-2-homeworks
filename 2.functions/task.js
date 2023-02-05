// 1
function getArrayParams(...arr) {
const min = Math.min(...arr);
const max = Math.max(...arr);
const avg = arr.reduce((total, i)=>total += i, 0)/arr.length;
  return { min: min, max: max, avg: +avg.toFixed(2) };
}

// 2

function summElementsWorker(...arr) {
return !arr.length ? 0 : arr.reduce((total, i)=>total += i, 0)
}

function differenceMaxMinWorker(...arr) {
return !arr.length ? 0 : Math.max(...arr) - Math.min(...arr)
}

function differenceEvenOddWorker(...arr) {
return !arr.length ? 0 : summElementsWorker(...selectEven(arr)) - summElementsWorker(...selectOdd(arr))
}

function averageEvenElementsWorker(...arr) {
  if (!arr.length) {
    return 0
}
const even = selectEven(arr);
return summElementsWorker(...even)/even.length
}

function selectEven(arr) {
  return arr.filter(i=>i%2 === 0)
}

function selectOdd(arr) {
  return arr.filter(i=>i%2 === 1)
}

// 3

function makeWork (arrOfArr, func) {
if (!Array.isArray(arrOfArr) || !arrOfArr.length) {
    return -infinity;
}
const arrOfResults = arrOfArr.map(arr=>func(...arr));
return Math.max(...arrOfResults)
}

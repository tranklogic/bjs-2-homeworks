"use strict"
function solveEquation(a, b, c) {
  let arr = [];
  const d = b**2 - 4*a*c;
  if (d === 0) {
    arr.push((-1*b)/(2*a))
  } else if (d > 0) {
    arr.push((-1*b + Math.sqrt(d))/(2*a));
    arr.push((-1*b - Math.sqrt(d))/(2*a));
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  for (let arg of arguments) {
    if (isNaN(Number.parseFloat(arg))) {
    return false;
    }
  }
  const p = percent/1200;
  const monthlyPayment = (amount - contribution) * (p + (p/(((1 + p)**countMonths) - 1)))
   return +(monthlyPayment*countMonths).toFixed(2)
}
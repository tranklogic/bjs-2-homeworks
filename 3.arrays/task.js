function compareArrays(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((item, i)=> item === arr2[i])
}

function getUsersNamesInAgeRange(users, gender) {
  return calcAvg(users.filter(i=> i.gender === gender), 'age')
}

function calcAvg(arr, prop) {
  return !arr.length ? 0 : arr.reduce((total, i)=>prop ? total += i[prop] : total += i, 0)/arr.length;
}
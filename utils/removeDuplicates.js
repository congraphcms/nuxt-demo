const removeDuplicates = function(myArr, prop) {
  return myArr.filter(
    (obj, index, arr) =>
      arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  )
}

export default removeDuplicates

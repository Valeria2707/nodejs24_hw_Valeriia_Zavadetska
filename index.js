const returnStrLength = (str) => console.log(str.length);

const multiplyByTwoTimesDigitsCount = (val) => {
  let result = val;
  for (let i = 0; i < String(val).length; i++) {
    result *= 2;
  }
  console.log(result);
};

returnStrLength("Node.js course");
multiplyByTwoTimesDigitsCount(33);

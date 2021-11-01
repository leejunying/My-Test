//1.1
const Alphabet = (text) => {
  return text.split("").sort().join("");
};

//1.2

const RLE = (text) => {
  if (text == text.toUpperCase()) {
    text = text.split("");
    let check = text[0];
    let count = 0;
    let newarr = [];
    for (let i = 0; i < text.length; i++) {
      if (check != text[i]) {
        if (count > 1) newarr.push(`${count}${check}`);
        else newarr.push(`${check}`);
        check = text[i];
        count = 1;
      } else {
        count++;
      }
    }

    return newarr.join("").toString();
  } else return "Input must be uppercase";
};

//1.3
const SumtoK = (arr, k) => {
  let start = arr[0];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (start + arr[j] == k) return true;
      else {
        start = arr[i];
      }

      if (start == arr[arr.length - 1]) {
        return false;
      }
    }
  }
};

module.exports = { Alphabet, RLE, SumtoK };

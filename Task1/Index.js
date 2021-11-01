const Ex = require("./Ex");

const a = Ex.Alphabet("webmaster");

const b = Ex.RLE("AABBBCCCCCAADDDDPPPQRRRSTTQQSXYZ");

const c = Ex.SumtoK([10, 15, 3, 7], 17);

console.log(a, b, c);

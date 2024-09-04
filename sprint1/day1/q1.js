const crypto = require("crypto");

var {
  addition,
  multiplication,
  subtraction,
  division,
  sine,
  cosine,
  tangent,
  randomNumberGenerator,
} = require("./operations");

const operation = process.argv[2];
console.log(operation);
var a;
var b;
if (operation != "cosine" && operation != "tan" && operation != "sine") {
  a = Number(process.argv[3]);
  b = Number(process.argv[4]);
} else {
  a = Number(process.argv[3]);
}

function calculation(operation) {
  switch (operation) {
    case "addition":
      return console.log(addition(a, b));
    case "subtraction":
      return console.log(subtraction(a, b));
    case "multiplication":
      return console.log(multiplication(a, b));
    case "division":
      return console.log(division(a, b));
    case "sine":
      return console.log(sine(a));
    case "cosine":
      return console.log(cosine(a));
    case "tangent":
      return console.log(tangent(a));
    case "randomNumberGenerator":
      return console.log(randomNumberGenerator(a));
    default:
      console.log("invalid operation");
  }
}
calculation(operation);

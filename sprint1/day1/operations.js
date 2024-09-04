const crypto = require("crypto");
function addition(a, b) {
  console.log("into addition");
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b == 0) {
    return;
  }
  return a / b;
}

function sine(theta) {
  return Math.sin(theta);
}
function cosine(theta) {
  return Math.cos(theta);
}
function tangent(theta) {
  return Math.tan(theta);
}

function randomNumberGenerator(size) {
  if (!size || isNaN(size)) {
    return "Provide size for random number generation.";
  }
  const randomBytes = crypto.randomBytes(Math.ceil(size / 2));
  // console.log(randomBytes);
  const res = randomBytes.toString("hex").slice(0, size);
  // console.log(res);
  return res;
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  sine,
  cosine,
  tangent,
  randomNumberGenerator,
};

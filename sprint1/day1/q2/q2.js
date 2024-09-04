const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
var a = process.argv[3];
var b;
switch (operation) {
  case "create":
    b = process.argv[4]; //content of file
    break;
  case "append":
    b = process.argv[4]; //file to append
    break;
  case "rename":
    b = process.argv[4]; // name of the new name
    break;
  default:
    break;
}

function read(a) {
  fs.readFile(a, (err, data) => {
    if (err) throw err;
    return console.log(data.toString());
  });
}

function deleteD(a) {
  try {
    fs.unlinkSync(a);
    console.log("successfully deleted /tmp/hello");
  } catch (err) {
    // handle the error
  }
}

function create(a, b) {
  fs.writeFile(a, b, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
    } else {
      console.log("File created and content written successfully!");
    }
  });
}

function append(a, b) {
  if (!a || !b) {
    console.error("Both source and destination file names must be provided.");
    return;
  }
  fs.appendFile(a, b, (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}

function rename(a, b) {
  fs.rename(a, b, (err) => {
    if (err) throw err;
    console.log("Rename complete!");
  });
}

function list(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
      console.log(file);
    });
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

function calculation(operation) {
  switch (operation) {
    case "read":
      return console.log(read(a));
    case "delete":
      return console.log(deleteD(a));
    case "create":
      return console.log(create(a, b));
    case "append":
      return console.log(append(a, b));
    case "rename":
      return console.log(rename(a));
    case "list":
      return console.log(list(a));
    default:
      console.log("invalid operation");
  }
}
calculation(operation);

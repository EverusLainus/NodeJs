const fs = require("fs/promises");
const path = "./db/db.json";

const readData = async () => {
  const data = await fs.readFile(path, "utf-8");
  console.log("readData :", data);
  return data;
};

const writeData = async (data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

exports.getAllStudents = async () => {
  const data = JSON.parse(await readData());
  return data.students;
};

exports.addStudent = async (student) => {
  const data = JSON.parse(await readData());

  console.log(typeof data);
  data.students.push(student);
  console.log("new data: service", data);
  await writeData(data);
};

exports.deleteStudent = async (studentId) => {
  const data = JSON.parse(await readData());
  console.log(typeof data.students);
  data.students = data.students.filter((student) => {
    console.log(student);
    return student.studentId !== studentId;
  });
  console.log("after filter in delete : ", data.students);
  await writeData(data);
};

exports.filterStudents = async (filters) => {
  const data = await readData();
  var filtered = data.students;
  if (filters.name)
    filtered = filtered.filter((student) => student.name === filters.name);
  if (filters.age)
    filtered = filtered.filter(
      (student) => student.age === Number(filters.age)
    );
  if (filters.grade)
    filtered = filtered.filter((student) => student.grade === filters.grade);
  return filtered;
};

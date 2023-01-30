function Student(name, gender, age) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.marks = [];
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName || 'javaScript';
}

Student.prototype.addMarks = function (...marks) {
  if (Array.isArray(this.marks)) {
    this.marks = [...this.marks, ...marks];
  }
}

Student.prototype.getAverage = function () {
  return ( !Array.isArray(this.marks) || !this.marks.length ) ? 0 : this.marks.reduce((total, mark)=>total+=mark, 0)/this.marks.length;
}

Student.prototype.exclude = function (reason) {
  this.excluded = reason;
  delete this.marks;
  delete this.subject;
}

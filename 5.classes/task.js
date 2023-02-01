class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
  }

  fix() {
    this.state *= 1.5;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0
    } else if (value > 100) {
      this._state = 100
    } else {
      this._state = value
    }
    return this._state
  }

  get type() {
    return null
  }

}

class Magazine extends PrintEditionItem {
  get type() {
    return 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
  }

  get type() {
    return 'book'
  }
}

class NovelBook extends Book {
  get type() {
    return 'novel';
  }
}

class FantasticBook extends Book {
  get type() {
    return 'fantastic';
  }
}

class DetectiveBook extends Book {
  get type() {
    return 'detective';
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book instanceof PrintEditionItem && book.state > 30) {
      this.books.push(book)
    }
  }

  findBookBy(type, value) {
    return this.books.filter(book=>book[type] === value)[0] || null;
  }

  giveBookByName(bookName) {
    let book = this.findBookBy('name', bookName);
    if (!book) {
      return null
    } else {
      this.books.splice(this.books.indexOf(book), 1);
      return book;
    }
  }

}


class Student {
  constructor(name, gender, age) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.marks = {};
  }

  getSubjectMarks(subjectName) {
    if (!Array.isArray(this.marks[subjectName])) {
      this.marks[subjectName] = [];
    }
    return this.marks[subjectName]
  }

  addMark(mark, subject) {
    if (mark >= 2 && mark <= 5) {
      this.getSubjectMarks(subject).push(mark);
    }
  }

  getAverageBySubject(subject) {
    return Student.avg(this.getSubjectMarks(subject))
  }

  getAverage() {
    const marks = Object.values(this.marks) || [];
    return (  !marks.length ) ? 0 : Student.avg(marks.map(Student.avg));
  }

  static avg(arr) {
    return ( !Array.isArray(arr) || !arr.length ) ? 0 : arr.reduce((total, mark)=>total+=mark, 0)/arr.length;
  }

}


function testCase() {
  const library = new Library('Городская библиотека');

  library.addBook(
   new DetectiveBook(
     "Артур Конан Дойл",
     "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
     1919,
     1008
   )
  );
  library.addBook(
   new FantasticBook(
     "Аркадий и Борис Стругацкие",
     "Пикник на обочине",
     1972,
     168
   )
  );
  library.addBook(
  new NovelBook(
  "Герберт Уэллс",
  "Машина времени",
  1895,
  138
  )
  );
  library.addBook(new Magazine("Мурзилка", 1924, 60));

  console.log(library.findBookBy("name", "Властелин колец")); //null
  console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

  console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
  const TimeMachine = library.giveBookByName("Машина времени");
  console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3
  TimeMachine.state = 40;
  TimeMachine.fix();
  console.log("Починили книгу в состоянии 40. Состояние после починки: " + TimeMachine.state); // 60
  library.addBook(TimeMachine);
  console.log("Количество книг после возврата: " + library.books.length); //Количество книг после возврата: 4
}
testCase()
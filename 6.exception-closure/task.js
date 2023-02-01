function parseCount(value) {
  value = Number.parseFloat(value);
  if (isNaN(value)) {
    throw new Error('Невалидное значение')
  }
  return value
}

function validateCount(value) {
  try {
    return parseCount(value)
  } catch(err) {
    return err
  }
}

class Triangle {
  constructor(...metrix) {
    this.metrix = metrix;
    if (this.metrix.length !== 3 || !this.exists()) {
      throw new Error('Треугольник с такими сторонами не существует')
    }
  }

  exists() {
    const p = this.perimeter/2;
    return !this.metrix.some(m=>m >= p)
  }

  get perimeter() {
    return this.metrix.reduce((total, m)=>total+=m, 0)
  }

  get area() {
    const p = this.perimeter/2;
    return +Math.sqrt (this.metrix.reduce((total, m)=>total *=(p - m), p)).toFixed(3)
  }

}

function getTriangle(...metrix) {
  try {
    return new Triangle(...metrix)
  } catch(err) {
    return {
      message: 'Ошибка! Треугольник не существует',
      get perimeter() {
        return this.message
      },
      get area() {
        return this.message
      }
    }
  }
}

(function testCase() {
  const gipsy = new Triangle(3 , 4, 5);
  console.log('Площадь египетского треугольника: ' + gipsy.area)
  
  console.log('Площадь несуществующего треугольника: ' + getTriangle(0, 0, 0).area)
  console.log('Вызов без параметров: ' + getTriangle().area)
})()

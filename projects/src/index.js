/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
function returnFirstArgument(a) {
  var result = a;

  return result;
}

var result = (10);

//console.log(result); результат задания 1


/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6 */

   function sumWithDefaultst(a, b) {
       var result = a + b;

       return result;
   }
      var result = sumWithDefaultst(10, 20);

      //console.log(result); вернет 30


 /*2.1 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */

function sumWithDefaults(a, b = 100) {
  var result = a + b;

  return result;
}

var result = sumWithDefaults(10);

//console.log(result); вернет 110

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */

function returnFnResult(fn) {
  var value = fn;
  return function fn() { 
    return value; 
  };
}

var result = returnFnResult('привет');

//console.log(result()); вернет 'привет'


/*
 Задание 4:

 Функция должна принимать число и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter(10);

   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */

function returnCounter(number) {
  return function fn() {
    return ++number;
  }
}

var f = returnCounter(10);


//значение аргумента должно быть 0 по умолчанию

function returnCounters(number = 0) {
  return function fn() {
    return ++number;
  }
}

var f = returnCounters();

//console.log(f()); выведет 1
//console.log(f()); выведет 2
//console.log(f()); выведет 3



/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */


function returnArgumentsArray() {
  var result = [...arguments];

  for (var i = 0; i < arguments.length; i++) {
    result[i] = arguments[i];
  }

  return result;
}

var result = returnArgumentsArray(1, 2, 3);

//var result = returnArgumentsArray(); нет аргументов/ возващает пустой массив

//console.log(result); вырнет массив [1, 2, 3] / либо []

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */

function sum(a, b) {
  return a + b;
}

var newSum = bindFunction(sum, 2, 4);

function bindFunction(fn, ...args) {
  return fn.bind(null, ...args);
}


export {
    returnFirstArgument,
    sumWithDefaultst,
    sumWithDefaults,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    returnCounters,
    bindFunction
}

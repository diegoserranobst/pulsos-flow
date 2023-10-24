const util = require("util");
var base = require('./base')

var msg = {}
var litros = 200; // por pulso
var intervalo = 2; // segundos
var n = 0
var payload = {
  pulsos: 5,
  totalizador: []
};

var thisId = 12345

// let i = setInterval(() => {

//   var data = base.init(payload, litros, intervalo, thisId);
//   n++

//   console.log("--------------- resultado", util.inspect(data, null, 4));

//   if (n === 1) {
//     payload = {
//       pulsos: 10,
//       totalizador: [{ value: "1000" }]
//     };
//   }
//   if (n === 2) {
//     payload = {
//       pulsos: 15,
//       totalizador: [{ value: "2000" }]
//     };
//   }
//   if (n === 3) {
//     payload = {
//       pulsos: 20,
//       totalizador: [{ value: "3000" }]
//     };
//   }
//   if (n === 4) {
//     payload = {
//       pulsos: 25,
//       totalizador: [{ value: "4000" }]
//     };
//   }
//   if (n === 5)  {
//     clearInterval(i)
//   }

// }, 1000);

let i = setInterval(() => {

  var data = base.init(payload, litros, intervalo, thisId);
  n++

  console.log("--------------- resultado", util.inspect(data, null, 4));

  if (n === 1) {
    payload = {
      pulsos: 10,
      totalizador: [{ value: "1000" }]
    };
  }
  if (n === 2) {
    payload = {
      pulsos: 15,
      totalizador: [{ value: "2000" }]
    };
  }
  if (n === 3) {
    payload = {
      pulsos: 0,
      totalizador: [{ value: "3000" }]
    };
  }
  if (n === 4) {
    payload = {
      pulsos: 5,
      totalizador: [{ value: "3000" }]
    };
  }
  if (n === 5)  {
    clearInterval(i)
  }

}, 1000);
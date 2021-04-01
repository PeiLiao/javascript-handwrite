//
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// for (let i = 0; i < 10; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// }

// for (var i = 0; i < 10; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log(i);
//     }, 1000);
//   })(i);
// }

// for (var i = 0; i < 10; i++) {
//   setTimeout(
//     function (i) {
//       console.log(i);
//     },
//     1000,
//     i
//   );
// }

// //
// for (var i = 0; i < 10; i++) {
//   let j = i;
//   setTimeout(() => {
//     console.log(j);
//   }, 1000);
// }

function* generator(i) {
  while (true) {
    yield i++;
  }
}
const gen = generator(0);
for (var i = 0; i < 10; i++) {
  // setTimeout(() => {
  console.log(gen.next().value);
  // }, 100 * i);
}

// 《函数式编程指北》练习
// usage
var _ = require('ramda')
var words = _.split(' ')
var sentences = _.map(words)
//
var filterQs = _.filter(_.match(/q/i))
// a max curry function
var _keepHighest = function (x, y) {
	return x >= y ? x : y
}
var max = _.reduce(_keepHighest, -Infinity)

// test
// var str = "it's a sentense."
// var strArr = [str, 'd c g', 'str tt d']
// console.log(words(str))
// console.log(sentences(strArr))
// console.log(max([35, 89, 57, 534, 354]))

// curry function
function curry(func, ...args) {
	if (func.length <= args.length) {
		return func(...args)
	}
	return function (...otherArgs) {
		return curry(func, ...args, ...otherArgs)
	}
}

// test curry
function min(a, b, c, d, e) {
	return Math.min(a, b, c, d, e)
}
var curryMin = curry(min, 4, 56)
console.log(curryMin(32)(2)(34))

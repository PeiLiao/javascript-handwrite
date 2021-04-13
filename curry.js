// 《函数式编程指北》练习
// usage
var _ = require('ramda')
var words = _.split(' ')
var sentences = _map(words)
//
var filterQs = filter(match(/q/i))
// a max curry function
var _keepHighest = function (x, y) {
	return x >= y ? x : y
}
var max = reduce(_keepHighest, -Infinity)

// test
var str = "it's a sentense."
var strArr = [str, str, str]
console.log(words(str))
console.log(sentences(strArr))
//
console.log(max([35]))

//

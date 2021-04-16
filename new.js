//
function myNew(constructor, params) {
	var obj = Object.create(null)
	obj.__proto__ = constructor.prototype
	constructor.apply(obj, params)
	return obj
}

function Student(name, age) {
	this.name = name
	this.age = age
}

// mock new
console.log(myNew(Student, ['wang', 5]))

// Object.create()
function create(obj) {
	var newObj = {}
	newObj.prototype = obj
	return newObj
}

function create2(obj) {
	var newObj = function () {}
	newObj.prototype = obj
	return newObj
}
var a1 = create({ a: 1 })
var a2 = create2({ a: 1 })
console.log(a1.a, a2.a)

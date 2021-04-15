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

console.log(create({ a: 1 }), create2({ a: 1 }))

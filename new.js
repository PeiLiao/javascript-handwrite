// mock new operator
function myNew(constructor, params) {
	var obj = Object.create(null)
	Object.setPrototypeOf(obj, constructor.prototype)
	// [__proto__] will be a normal property and won't be inherited
	// obj.__proto__ = constructor.prototype
	var res = constructor.apply(obj, params)
	if (typeof res === 'object') {
		return res
	}
	return obj
}

function Student(name, age) {
	this.name = name
	this.age = age
}

// mock new
console.log(myNew(Student, ['wang', 5]))

// mock Object.create()
// wrong: only function object has prototype
// so [prototype] will be a normal property of obj and won't be inherited by children
function create(obj) {
	var newObj = {}
	newObj.prototype = obj
	return newObj
}

// correct: make a empty constructor and set it's prototype, then return the instance
// create(null) will create a plain obj without inheriting properties from Object
// but literal {} is a common empty object inheriting from Object
function create2(obj) {
	var newObj = function () {}
	newObj.prototype = obj
	return new newObj()
}
var a1 = create({ a: 1 })
var a2 = create2({ a: 1 })
console.log(a1.a, a2.a)

// multiple solutions for inheriting in javascript
var school = { address: 'zhaoyang', tel: '6688' }
function A() {
	this.name = 'jonn'
	this.age = 5
	this.school = school
	this.printAge = function () {
		console.log(this.age)
	}
}
A.prototype.printName = function () {
	console.log(this.name)
}

// constructor inherite
function B() {
	// A.constructor.apply(this)
	A.call(this)
}
// get a copy of properties
var b1 = new B()
var b2 = new B()
console.log(b1.printName === b2.printName)

// prototype inherite
function C() {}
C.prototype = new A()
C.prototype.constructor = C
var c1 = new C()
var c2 = new C()

// share father properties
console.log(c1.school, c2.school)
c1.school.tel = 8877
console.log(c1.school, c2.school)

// composite inherite
function D() {
	A.constructor.apply(this)
}
D.prototype = new A()
D.prototype.constructor = C

var d1 = new D()
var d2 = new D()

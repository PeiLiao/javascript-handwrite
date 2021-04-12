function myNew(constructor, params) {
	var obj = Object.create(null)
	obj.__proto__ = constructor.prototype
	obj.prototype = undefined
	obj.constructor = constructor.constructor
	obj.constructor(params)
	return obj
}

function Student(name, age) {
	this.name = name
	this.age = age
}

// mock new
console.log(myNew(Student, ['wang', 5]))

// call
function mycall(ctx, args) {
	console.log('mycall')
	ctx.func = this
	ctx.func(args)
}

var light = {
	value: 1,
	on: function (flag) {
		console.log(this.value, flag)
	},
}

var anotherLight = {
	value: 2,
}

light.call = this.mycall
light.call(anotherLight, -1)

// apply
// bind

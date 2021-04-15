// call
function mycall(ctx = window, ...args) {
	// if [callee] is Function.prototype, it means that function doesn't exist, so undefined is returned
	if (this === Function.prototype) {
		return undefined
	}
	const func = Symbol()
	ctx[func] = this
	const res = ctx[func](...args)
	delete ctx[func]
	return res
}

// apply
// the only difference between apply and call is
function myApply(ctx = window, args) {
	// if [callee] is Function.prototype, it means that function doesn't exist, so undefined is returned
	if (this === Function.prototype) {
		return undefined
	}
	// avoid covering existed function
	const func = Symbol()
	ctx[func] = this

	const res = args ? ctx[func](...args) : ctx[func]()
	// important: remove the tempororily
	delete ctx[func]
	return res
}

// bind
function myBind(ctx = window, ...args) {
	if (this === Function.prototype) {
		return undefined
	}
	var func = this
	return function F(...otherArgs) {
		// cause bind returns a new function, and this function might be called by [new] operator
		// if it's called by [new], an object would be created and returned. the arguments are taken, but the context is unused
		// otherwise, execute the function with given context and arguements and finally return the results
		if (this instanceof F) {
			return new func(...args, ...otherArgs)
		}
		const res = func.mycall(ctx, ...args, ...otherArgs)
		return res
	}
}

var light = {
	value: 1,
	on: function (...flag) {
		console.log(this.value, ...flag)
	},
}

var anotherLight = {
	value: 2,
}

light.on('normal')

light.on.mycall = mycall
light.on.mycall(anotherLight, 'call', 'it')

light.on.myApply = myApply
light.on.myApply(anotherLight, ['apply', 'it'])
light.on.myApply(anotherLight)

light.on.myBind = myBind
var bound = light.on.myBind(anotherLight, 'bind', 'it')
bound('execute', 'it')
var boundobj = new bound('new')

var b = light.on.bind(anotherLight)
var bb = new b('new bb')
console.log(boundobj, bb)

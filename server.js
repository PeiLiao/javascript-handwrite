let http = require('http')

let fs = require('fs')

let handleRequest = (request, response) => {
	fs.readFile('./public/index.html', null, function (error, data) {
		if (error) {
			response.writeHead(404)
			respone.write('Whoops! File not found!')
		} else {
			response.writeHead(200, {
				'Content-Type': 'text/html',
			})
			response.write(data)
		}
		response.end()
	})
}

let app = http.createServer(handleRequest)
app.listen(8000)

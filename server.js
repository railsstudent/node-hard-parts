const http = require('http');
const fs = require('fs');

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    const data = fs.readFileSync('./index.html', 'utf-8')
    response.end(data)
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    console.log('request', request)
    try {
      fs.appendFileSync('hi_log.txt', 'Somebody said hi.\n')   
    } finally {
      response.end('hi back to you!')
    }
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let buffer = []
    let strBody = ''
    request.on('data', (data) => buffer.push(data))
    request.on('end', () => { 
      let responseText = 'good morning'
      strBody = Buffer.concat(buffer).toString()
      if (strBody === 'hello') {
        responseText = 'hello there!'
      } else if (strBody === 'what\'s up') {
        responseText = 'the sky'
      }
      response.end(responseText)
      fs.appendFileSync('hi_log.txt', `${strBody}\n`)
    })    
  }
  else if (request.method === 'GET' && request.url === '/style.css') {
    try {
      const styleSheet = fs.readFileSync('./style.css', 'utf-8')
      response.end(styleSheet)
    } catch (err) {
      console.error(err)
    }
  } else if (request.method === 'DELETE' && request.url === '/greeting') {
    // delete hi_log.txt
    fs.unlinkSync('./hi_log.txt')
    response.end('delete hi_log.txt is successful')
  } else if (request.method === 'PUT' && request.url === '/greeting') {
    const buffer = []
    request.on('data', (data) => buffer.push(data))
    request.on('end', () => { 
      const message = `${Buffer.concat(buffer).toString()}\n`
      fs.writeFileSync('./hi_log.txt', message)
    })
    response.end('greeting updated')
  } else {
    // Handle 404 error: page not found
    // code here...
    response.writeHead(404, 'Error: Not Found')
    .end()    
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);

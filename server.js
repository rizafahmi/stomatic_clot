const http = require('http')

const httpHandler = (request, response) => {
  console.log(response)
  response.end()
}

const server = http.createServer(httpHandler)

const listenCallbackFn = (err) => {
  if (err) {
    throw Error
  }
  console.log('Server is running')
}
server.listen(6543, listenCallbackFn)

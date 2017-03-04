const http = require('http')

const dispatch = (url) => {
  const [path, query] = url.split('?')
  const [_empty, moduleName, methodName] = path.split('/')
  console.log(moduleName, methodName)
}

const httpHandler = (request, response) => {
  // Requests
  // const method = request.method
  const url = request.url
  if (url !== '/favicon.ico') {
    dispatch(url)
  }

  // Response
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('X-Powered-By', 'Stomatic Clot')
  response.write('Welcome to Stomatic Clot')
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

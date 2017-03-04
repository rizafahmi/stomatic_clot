const http = require('http')

const dispatch = (url, cb) => {
  const [path, query] = url.split('?')
  const [_empty, folderName, moduleName, methodName] = path.split('/')
  const module = require(`./${folderName}/${moduleName}`)
  const methodCaller = module[`${methodName}`]()
  cb(methodCaller)
}

const httpHandler = (request, response) => {
  // Requests
  // const method = request.method
  const url = request.url

  // Response
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('X-Powered-By', 'Stomatic Clot')
  if (url !== '/favicon.ico') {
    dispatch(url, (content) => {
      response.write(content)
      response.end()
    })
  }
}

const server = http.createServer(httpHandler)

const listenCallbackFn = (err) => {
  if (err) {
    throw Error
  }
  console.log('Server is running')
}
server.listen(6543, listenCallbackFn)

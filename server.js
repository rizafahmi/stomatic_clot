const http = require('http')

const dispatch = (url, cb) => {
  const [path, query] = url.split('?')
  const [_, moduleName, methodName] = path.split('/')
  const module = require(`./lib/${moduleName}`)
  let paramsObj = {}

  if (query) {
    const params = query.split('&')
    for (let i = 0; i < params.length; i++) {
      const items = params[i].split('=')
      paramsObj[items[0]] = items[1]
    }
  }
  const methodCaller = module[`${methodName}`](paramsObj)
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
    const startTime = new Date()
    dispatch(url, (content) => {
      const newResponse = response
      newResponse.write(content)
      newResponse.end()
      const endTime = new Date() - startTime
      console.info(`[%s] %s %dms\n`, request.method, url, endTime)
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

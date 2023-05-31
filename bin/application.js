const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application {
  constructor() {
    this.middleware = []
    // 实例初始化时创建context/request/response实例对象
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  use(fn) {
    this.middleware.push(fn)
  }
  createContext(req, res) {
    const ctx = Object.create(this.context)
    const request = Object.create(this.request)
    const response = Object.create(this.response)

    ctx.request = request // 自己封装的请求
    ctx.request.req = ctx.req = req

    ctx.response = response // 自己封装的相应
    ctx.response.res = ctx.res = res

    return ctx
  }
  compose(ctx) {
    if (!Array.isArray(this.middleware)) throw new TypeError("Middleware stack must be an array")
    for (let fn of this.middleware) {
      if (typeof fn !== 'function') throw new TypeError("Middleware must be composed of functions")
    }

    let index = -1 // 代表递归执行的次数

    const dispatch = (i) => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i

      const fn = this.middleware[i]
      if (i === this.middleware.length || !fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return dispatch(0)
  }
  callback() {
    const handleRequest = (req, res) => {
      let ctx = this.createContext(req, res)
      res.statusCode = 404
      this.compose(ctx).then(() => {
        // 响应用户
        if (ctx.body) {
          res.end(ctx.body)
        } else {
          res.end('Not Found')
        }
      }).catch((e) => {
        console.log(e)
      })
    }

    return handleRequest
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }
}

module.exports = Application

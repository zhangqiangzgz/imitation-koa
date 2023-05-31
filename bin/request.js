const url = require('url')

const request = {
  get url() {
    // ctx.request.req.url
    // 这里的this指ctx.request，request上设置req方便取值
    return this.req.url
  },
  get path() {
    const { pathname } = url.parse(this.req.url)
    return pathname
  },
  get query() {
    const { query } = url.parse(this.req.url)
    return query
  }
}

module.exports = request
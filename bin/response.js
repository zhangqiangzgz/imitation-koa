const response = {
  _body: undefined,
  get body() {
    return this._body
  },
  set body(value) {
    // ctx.response.body或ctx.body赋值后，状态码设置为200
    this.res.statusCode = 200
    this._body = value
  }
}

module.exports = response
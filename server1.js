// const Koa = require('koa')
const Koa = require('./bin/application.js')

const app = new Koa()

// 1.多个应用之间的上下文ctx是不同的实例对象
// 2.多个请求之间的上下文ctx是不同的实例对象

app.use((ctx) => {
  console.log(ctx.req.url)
  console.log(ctx.request.req.url)


  console.log(ctx.request.path) // path是新增的属性，原来的req对象上没有
  console.log(ctx.path)

  ctx.response.body = '1111'
  ctx.body = '222'
})

app.listen(3000, ()=> {
  console.log(`Server running on 3000`)
})
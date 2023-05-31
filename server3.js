// const Koa = require('koa')
const Koa = require('./bin/application.js')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log('1')
  await next()
  console.log('2')
  ctx.body = '2'
})

app.use(async (ctx, next) => {
  console.log('3')
  await next()
  console.log('4')
  ctx.body = '4'
})

app.use(async (ctx, next) => {
  console.log('5')
  await next()
  console.log('6')
  ctx.body = '6'
})

// => 1 3 5 6 4 2

app.listen(3000, ()=> {
  console.log(`Server running on 3000`)
})
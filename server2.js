const Koa = require('koa')
// const Koa = require('./bin/application.js')

const app = new Koa()

const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('sleep')
      resolve()
    }, 2000);
  })
}

// 1.调用next函数会执行下一个中间件函数
// 2.koa所有异步操作都是基于promise
// 3.koa内部会将所有中间件函数组合成一个promize，从开始执行到结束，这个promise就完成了。

app.use(async (ctx, next) => {
  console.log('1')
  next()
  console.log('2')
  ctx.body = '2'
})

app.use(async (ctx, next) => {
  console.log('3')
  await sleep() // 遇到异步直接返回上一个函数执行到结束，所以中间件要使用async...await...，不然异步容易出问题
  next()
  console.log('4')
  ctx.body = '4'
})

app.use(async (ctx, next) => {
  console.log('5')
  next()
  console.log('6')
  ctx.body = '6'
})

// => 1 3 2 sleep 5 6 4

app.listen(3000, ()=> {
  console.log(`Server running on 3000`)
})
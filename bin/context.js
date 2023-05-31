const context = {

}

// 例如取ctx.path属性可以去crx.request上取
defineGetter = (target, key) => {
  context.__defineGetter__(key, function(){
    return this[target][key]
  })
}

defineSetter = (target, key) => {
  context.__defineSetter__(key, function(value){
    this[target][key] = value
  })
}

defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('request', 'query')

defineGetter('response', 'body')
defineSetter('response', 'body')


module.exports = context
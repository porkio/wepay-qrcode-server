const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    ctx.body = `<h1>Nothing here.</h1>`
})

module.exports = router

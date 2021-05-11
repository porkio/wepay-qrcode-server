const router = require('koa-router')()
const axios = require('axios')
const stringRandom = require('../utils/strRand')
const parseXML = require('../utils/parseXML')

const {
    appid,
    mch_id,
    mch_api_key,
    notify_url,
    server_ip,
    trade_type,
    body,
    wepay_url,
    xmlBody,
    signString
} = require('../wepay.config')

router.post('/api/pay', async (ctx, next) => {
    const form = ctx.request.body // 通过前端传来的数据
    const fee = form.fee // 通过前端传来的费用值
    const orderNo = signString(fee, server_ip, stringRandom(12)) // 不重复的订单号

    const data = xmlBody(fee, orderNo) // fee是费用，orderNo是订单号（唯一）
    const res = await axios.post(wepay_url, {
        data: data.xml
    }).then(async res => {
        const resJson = await parseXML(res.data)
        console.log(resJson)
        return resJson // 拿到返回的数据
    }).catch(err => {
        console.log(err)
    })
    if (res.return_code === 'SUCCESS') { // 如果返回的
        ctx.body = {
            code: 0,
            message: 'OK',
            code_url: res.code_url, // code_url就是用于生成支付二维码的链接
            order_no: orderNo // 订单号
        }
        return
    }
    if (res.return_code === 'FAIL') {
        ctx.body = {
            code: -1,
            message: res.return_msg
        }
    }

})

module.exports = router

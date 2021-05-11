const md5 = require('md5')

const xmlBody = (fee, nonce_str) => {
    // fee 是费用， nonce_str 是(唯一)订单号
    const xml = `
        <xml>
        <appid>${appid}</appid>
        <body>${body}</body>
        <mch_id>${mch_id}</mch_id>
        <nonce_str>${nonce_str}</nonce_str>
        <notify_url>${notify_url}</notify_url>
        <out_trade_no>${nonce_str}</out_trade_no>
        <total_fee>${fee}</total_fee>
        <spbill_create_ip>${server_ip}</spbill_create_ip>
        <trade_type>NATIVE</trade_type>
        <sign>${signString(fee, server_ip, nonce_str)}</sign>
        </xml>
    `
    return {
        xml,
        out_trade_no: nonce_str
    }
}

const signString = (fee, ip, nonce) => {
    let tempString = `appid=${appid}&body=${body}&mch_id=${mch_id}&nonce_str=${nonce}&notify_url=${notify_url}&out_trade_no=${nonce}&spbill_create_ip=${ip}&total_fee=${fee}&trade_type=${trade_type}&key=${mch_api_key}`
    return md5(tempString).toUpperCase()
}

const appid = '***********', // appid
    mch_id = '***********', // 商户号
    mch_api_key = '***********', // 支付 apikey
    notify_url = 'https://api.xxxx.com/pay/notify', // 服务端可访问的域名和接口
    server_ip = '0.0.0.0', // 服务端的ip地址
    trade_type = 'NATIVE', // NATIVE对应的是二维码扫码支付
    body = '购买平台增值服务', // 用于显示在支付界面的提示词
    wepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder' // 微信服务端统一下单地址

module.exports = {
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
}
# 微信支付（二维码生成方式）服务端

## 框架
Nodejs Koa2 框架

## Useage
### Step1  
```sh
git clone https://github.com/porkio/wepay-qrcode-server.git wepay.koa2.server
cd wepay.koa2.server
npm install
```

### Step2
```sh
mv wepay.config.simple.js wepay.config.js
vim wepay.config.js

// 在商户平台中找到对应的值添入
const appid = '***********', // appid
    mch_id = '***********', // 商户号
    mch_api_key = '***********', // 支付 apikey
    notify_url = 'https://api.xxxx.com/pay/notify', // 服务端可访问的域名和接口
    server_ip = '0.0.0.0', // 服务端的ip地址
    trade_type = 'NATIVE', // NATIVE对应的是二维码扫码支付
    body = '购买平台增值服务', // 用于显示在支付界面的提示词
    wepay_url = 'https://api.mch.weixin.qq.com/pay/unifiedorder' // 微信服务端统一下单地址
```

### Step3
```sh
npm run dev
// 使用 postman 请求（post方式）接口 localhost:3000/api/pay
```

若请求成功则返回一个微信支付的链接  
![post 请求成功](https://wlwo.oss-cn-hangzhou.aliyuncs.com/article_images/wepay-qrcode-1620722943830.jpg)  

前端生成该链接的二维码后微信扫扫一扫  
![微信支付](https://wlwo.oss-cn-hangzhou.aliyuncs.com/article_images/wepay-qrcode-1620723282058.jpg)

### Tips
本项目使用了 koa2-cors 使其支持跨域，为了安全考量可以考虑关闭

```js
// app.js
const cors = require('koa2-cors')
app.use(cors())
// 注释以上两行即可
```


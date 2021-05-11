const xml2js = require('xml2js')
// 将XML转为JS对象
module.exports = (xml) => {
    return new Promise((res, rej) => {
        xml2js.parseString(xml, { trim: true, explicitArray: false }, (err, json) => {
            if (err) {
                rej(err)
            } else {
                res(json.xml)
            }
        })
    })
}

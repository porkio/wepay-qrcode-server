// 生成指定位数的随机字符串
const stringRandom = num => {
    let str = ''
    while(str.length < num) {
        let charNum = parseInt(Math.random() * 100)
        if (charNum > 64 && charNum < 91 || charNum > 96 && charNum < 123)
            str += String.fromCharCode(charNum)
    }
    return str
}

module.exports = stringRandom
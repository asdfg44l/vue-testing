import CryptoJS from 'crypto-js'
import LZString from 'lz-string'

let _private = new WeakMap()

export function cryptoJS({ salt= 54564, iv= 1544 }) {

    //私有變數
    _private.set(this, {
        salt,
        iv
    })

    //定義格式化
    this.formatter = {
        // 加密後針對每個屬性做處理
        stringify: function(cipherParams) {
            var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }

            // 選擇要加入偏移值(iv) 或是加鹽(salt)
            if(cipherParams.iv) jsonObj.iv = cipherParams.iv.toString()
            if(cipherParams.salt) jsonObj.s = cipherParams.salt.toString()


            return JSON.stringify(jsonObj)
        },
        // 解密後針對每個屬性做處理
        parse: function(jsonStr) {
            var jsonObj = JSON.parse(jsonStr)
            
            // 新建一個 cipharParams
            var cipharParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct) // add ciphertext
            })

            // add vi or salt
            if(jsonObj.vi) cipharParams.vi = CryptoJS.enc.Hex.parse(jsonObj.vi)
            if(jsonObj.s) cipharParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)

            return cipharParams
        }
    }

    this.encrypted = function(value, secret) {
        const { salt, iv } = _private.get(this)

        value = JSON.stringify(value) //字串化 json物件
        //加密並生成密文
        const cipherParams = CryptoJS.AES.encrypt(value, secret, {
            format: this.formatter,
            salt,
            iv
        }).toString()

        return LZString.compress(cipherParams) //回傳並壓縮密文
    }

    this.decrypted = function(encryptObj, secret) {
        const { salt, iv } = _private.get(this)

        encryptObj = LZString.decompress(encryptObj) //解壓縮密文
        //解密並將密文還原成資料
        const ciphertext = CryptoJS.AES.decrypt(encryptObj, secret, {
            format: this.formatter,
            salt,
            iv
        }).toString(CryptoJS.enc.Utf8)
        
        return JSON.parse(ciphertext)
    }
}
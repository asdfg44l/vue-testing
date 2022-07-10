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
        // 解密前針對每個屬性做處理
        parse: function(jsonStr) {
            var jsonObj = JSON.parse(jsonStr)
            
            // 新建一個 cipharParams
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct) // add ciphertext
            })

            // add vi or salt
            // 這兩個值必須轉成 16進位制
            if(jsonObj.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            if(jsonObj.s) cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)

            return cipherParams
        }
    }

    this.encrypted = function(value, secret) {
        const { salt, iv } = _private.get(this)

        value = JSON.stringify(value) //字串化 json物件
        //加密並生成密文
        const cipherText = CryptoJS.AES.encrypt(value, secret, {
            format: this.formatter,
            salt,
            iv
        }).toString() //cipherParams stringify to ciphertext

        return LZString.compress(cipherText) //回傳並壓縮密文
    }

    this.decrypted = function(ciphertext, secret) {
        ciphertext = LZString.decompress(ciphertext) //解壓縮密文
        
        //解密並將密文還原成資料
        //ciphertext stringify to cipherParams
        const plaintext = CryptoJS.AES.decrypt(ciphertext, secret, {
            format: this.formatter
        }).toString(CryptoJS.enc.Utf8)
        
        return JSON.parse(plaintext)
    }
}
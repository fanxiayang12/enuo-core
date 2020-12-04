var ObjectID = require("mongodb").ObjectID;

var assert = require('assert');
var crypto = require('crypto');

var u = {
    //baseTime: 1508225619000,
    baseTime: 1420041600000,
    autoId: function() {
        var timestamp = Date.parse(new Date());
        var n = 8;
        var num = (timestamp - this.baseTime) + '';

        var i = num.length;
        while (i++ < n)
            num = num + '0';
        num = num + this.randNum(1000, 9999);
        return parseInt(num);
    },
    randNum: function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },
    randStr: function(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    },
    uuid: function() {
        return (new ObjectID()).toHexString();
    },
    /**
     * key 
     * iv
     * alg
     * autoPad
     * plaintext
     *   alg: 'des-ede3',    //3des-cbc  
     *   autoPad: true,  
     *   key: '304cd84bf1f311e783281c98',  
     *   plaintext: '',  
     *   iv: null  
     */
    des: function(param) {

        var key = new Buffer(param.key); //加密/解密key
        var iv = new Buffer(param.iv ? param.iv : 0)
        var plaintext = param.plaintext //加密/解密数据
        var alg = param.alg
        var autoPad = param.autoPad
        //加密
        function encrypt() {
            //encrypt  
            var cipher = crypto.createCipheriv(alg, key, iv);
            if(autoPad){
                cipher.setAutoPadding(autoPad) //default true  
            }
            var ciph = cipher.update(plaintext, 'utf8', 'hex');
            ciph += cipher.final('hex');
            // console.log(alg, ciph)  
            return ciph;
        }
        //解密
        function decrypt() {
            //decrypt  
            var decipher = crypto.createDecipheriv(alg, key, iv);
            if(autoPad){
                decipher.setAutoPadding(autoPad)
            }
            var txt = decipher.update(plaintext, 'hex', 'utf8');
            txt += decipher.final('utf8');
            // console.log("txt",txt)      ;
            return txt;
            // assert.equal(txt, plaintext, 'fail');  
        }

        return {
            encrypt: encrypt,
            decrypt: decrypt

        }
    },

    rc4 :function (_key,str){
            
        var s = [], j = 0, x, res = '';
        for (var i = 0; i < 256; i++) {
            s[i] = i;
        }
        for (i = 0; i < 256; i++) {
            j = (j + s[i] + _key.charCodeAt(i % _key.length)) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
        }
        i = 0;
        j = 0;
        for (var y = 0; y < str.length; y++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
            res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
        }
        return res;
    }

    /***** 加密测试 例子 */
    // des({  
    //     alg: 'des-ecb',  
    //     autoPad: true,  
    //     key: '01234567',  
    //     plaintext: '1234567812345678',  
    //     iv: null  
    // })  

    // des({  
    //     alg: 'des-cbc',  
    //     autoPad: true,  
    //     key: '01234567',  
    //     plaintext: '1234567812345678',  
    //     iv: '12345678'  
    // })  

    // des({  
    //     alg: 'des-ede3',    //3des-ecb  
    //     autoPad: true,  
    //     key: '0123456789abcd0123456789',  
    //     plaintext: '1234567812345678',  
    //     iv: null  
    // })  

    // des({  
    //     alg: 'des-ede3-cbc',    //3des-cbc  
    //     autoPad: true,  
    //     key: '0123456789abcd0123456789',  
    //     plaintext: '1234567812345678',  
    //     iv: '12345678'  
    // })  

}
module.exports = u;

/***** 加解密测试 例子 */
// var result = u.des({
//             alg: 'des-ede3',    //3des-cbc  
//             autoPad: true,  
//             key: '304cd84bf1f311e783281c98',  
//             plaintext: '',  
//             iv: null  

// }).decrypt();

// console.log(JSON.parse(result));
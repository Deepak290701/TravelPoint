var aesjs = require('aes-js');
var buffer = require('buffer/').Buffer;
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
const { enc } = require('crypto-js');
var moment = require('moment')
const crypto = require('crypto');
// 5YXCmAfbcm4sYgoM8fT/06MjhQSBmgkox764fUmaKwY=\n


const validate = (salt,encryptedData1) => {
   const algorithm = 'aes-256-cbc';
   const digest = 'sha1';
   var x = salt
   // 'fHX4xp6L9IE1YUfCLknn9w==';
   const myBuffer = Buffer.from(x, 'base64');
   var salt =  Int8Array.from(Buffer.from(myBuffer))
   
   
   
   
   
   
   
   const key = crypto.pbkdf2Sync("PasswordKey", salt, 1324, 32, digest);
   let iv = crypto.pbkdf2Sync("ivSecretPassword", salt, 1324, 16  , digest);
   
   
   
   
   
   var encry = {
   
         key: key.toString('base64'), 
         iv: iv.toString('base64'), 
         encryptedData: encryptedData1
         // 'DcV0VRYa3D48MhvAWj1qtxpHt6TtSbcNAbXX5UfhrSg='
     
      }
     
   
   
   
      iv = Buffer.from(encry.iv, 'base64');
      let encryptedText = Buffer.from(encry.encryptedData, 'base64');
      let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      var decr = decrypted.toString();
   
      
     
   
   
     var token = decr.substring(0,decr.length-14);
     var timestamp = decr.slice(-14)
     var timestampfinal = timestamp.substring(0,4) + '-' +
      timestamp.substring(4,6) + '-' + timestamp.substring(6,8)  + 'T' 
      + timestamp.substring(8,10) + ":" + timestamp.substring(10,12) + ":" + timestamp.substring(12,14) +
       ".000Z";
     
   
   var startDate = new Date(new Date().toUTCString())  
   var remainingDate = moment(timestampfinal).diff(startDate, 'minutes');
     
     if(Math.abs(remainingDate) <= 5 && token == 'VivekYouAreAwesome'){
        return true  
     }
     
     else{
      console.log(Math.abs(remainingDate));
      console.log(token);
        return false
        
     }
     
   
}

module.exports ={
   validate
}

 



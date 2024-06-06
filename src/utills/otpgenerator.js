const otpgenertor=()=>{
    var minm = 10000; 
    var maxm = 99999; 
   let otp = Math.floor(Math .random() * (maxm - minm + 1)) + minm;
   return otp
}

module.exports=otpgenertor
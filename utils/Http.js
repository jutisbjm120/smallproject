//封装post方法和get方法
const baseURL="https://samsara.mynatapp.cc/mock/5ea19003e10de74a1c8e0b99/wechat";
class Http{
  static request(url,param={},method='GET'){
    console.log(baseURL+url,param);
    return  new Promise((resolve,reject)=>{
      let obj=Object.assign({},{
        url:baseURL+url,
        method:method,
        header:{
          'content-type':'application/json',
          'charset':'utf-8'
        },
        data:{
          ...param
        },
        success:function(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
        
      })
        wx.request(obj)
    })
  }
}
export default Http
var app=getApp();
class Store{
  get userpwd(){
    return app.globalData.userpwd
  }
  set userpwd(value){
    app.globalData.userpwd=value
  }
  //获取和赋值历史搜索数据
  get historylist(){
    return app.globalData.historylist
  }
  set historylist(value){
    app.globalData.historylist=value
  }
  //赋值和获取我的订单
  get orderlist(){
    return app.globalData.orderlist
  }
  set orderlist(value){
    app.globalData.orderlist=value
  }
}
 const store=new Store();
 export default store;
 
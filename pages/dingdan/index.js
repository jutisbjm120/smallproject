// pages/dingdan/index.js
import srort from './../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      taplist:[{
        title:'全部订单',
        type:'every'
      },{
        title:'待评价',
        type:'evaluate'
      },{
        title:'退款',
        type:'refund'
      }],
      activetype:'every',
      pruductlist:[],
      emptytit:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  toggleactive(e){
    let target=e.currentTarget.dataset.type,emptytit=''
    this.setData({
      activetype:target
    })
    switch(target){
      case 'evaluate':
        emptytit='没有评价订单哦~';
      break;
      case 'refund':
        emptytit='没有退款订单哦~'
      break;
      default :
       emptytit=''
      break;
    }
    this.setData({
      emptytit
    })
  },
  onLoad: function (options) {
    console.log(srort.orderlist);
    this.setData({
      pruductlist:srort.orderlist
    })
    console.log(this.data.pruductlist);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/shoplist/shoplist.js
import {productlistpost,getdistancegget} from './../../utils/util'
import store from './../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tablist:['点菜','评价','商家'],
    tabactiveindex:0,
    scrolllist:['热销','折扣','特色烧烤','优选套餐','精选凉菜','经典拌面','舒心盖饭','风味菜肴','主食厨房','早餐主食','休闲小镇'],
    scrolllistactiveindex:0,
    presslist:[],
    tabtit:'热销',
    scrollTtop:0,
    targetlist:[],
    count:0,//定义购买的件数
    sumprice:0,
    evaluatelist:['全部(595)','有图评价(25)','好评(546)','差评(32)','味道赞(22)','满意(5)','包装好(4)','分量足(3)','主食不错(3)','贵(3)'],
    evaluateinfo:{},
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'正在拼命加载中...',
      mask:true
    })
    console.log(options);
    getdistancegget().then(res=>{
      let evaluateinfo=res.data.data;
      evaluateinfo['packaging']=evaluateinfo['packaging']-0;
      evaluateinfo['taste']=evaluateinfo['taste']-0;
      this.setData({
        evaluateinfo
      })
      console.log(res.data.data);
    })
    productlistpost({}).then(res=>{
      this.setData({
        presslist:res.data.data.array,
        info:options
      },()=>{
        wx.hideLoading();
        let targetlist=[]
        let selQuery = wx.createSelectorQuery().selectAll('.tab-header');
        selQuery.boundingClientRect().exec(res=>{
          targetlist=res[0]
          console.log(targetlist);
          this.setData({
            targetlist
          })
        })
        wx.setNavigationBarTitle({
          title: this.data.info.title,
          success: function(res) {
            // success
          }
        })
      })
    })
  },
  //结算方法
  clearing(){
    wx.showNavigationBarLoading();
    let target=this.data.presslist;
    let {image,title}=this.data.info,list=[];
    for(let i=0;i<target.length;i++){
      let arr=target[i].list;
      for(let j=0;j<arr.length;j++){
        if(arr[j].count==0) continue;
        let {count,title}=arr[j];
        list.push({count,product:title})
      }
    }
    let orderlist=store.orderlist
    console.log(orderlist);
    orderlist.push({
      image,
      title,
      sumproduct:this.data.sumprice,
      productlist:list
    });
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      success(){
        store.orderlist=orderlist;
      }
    })
    wx.hideNavigationBarLoading();
  },
  onClickCommentTag(){},
  currentchange(e){
    this.setData({
      tabactiveindex:e.detail.current
    })
    console.log(e.detail);
  },
  onClickPanelHeader(e){
    this.setData({
      tabactiveindex:e.currentTarget.dataset.index,
      current:e.currentTarget.dataset.index
    })
  },
  chooseType(e){
    let targer=e.currentTarget.dataset;
    this.setData({
      scrolllistactiveindex:targer.index,
      tabtit:targer.item,
    })
    this.data.targetlist.length>0&&this.configscrorr()    
  },
  configscrorr(){
    let targer=this.data.targetlist[this.data.scrolllistactiveindex];
   this.setData({
     scrollTtop:targer.top-120
   })
  },
  actionscroll(e){
    let targetlist=this.data.targetlist;
    let top=e.detail.scrollTop;
    for(let i=0;i<targetlist.length;i++){
      if(top>=targetlist[i].top-122){
        this.setData({
          scrolllistactiveindex:i,
          tabtit:this.data.scrolllist[i]
        },()=>{
          return;
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setconfigclick(e){
    let target=e.currentTarget.dataset;
    let {inde,itemindex,direation,price}=target;
    let count=this.data.presslist[inde].list[itemindex].count;
    let presslist=this.data.presslist;
    presslist[inde].list[itemindex].count=count+1*direation;
    this.setData({
      presslist,
      count:this.data.count+1*direation,
      sumprice:this.data.sumprice+(price-0)*direation
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#333'
  })
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
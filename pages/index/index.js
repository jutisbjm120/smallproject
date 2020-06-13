import {getIndexlistInfo,getoverall,getfilterlist} from './../../utils/util'
import {push} from './../../router/index'
var QQMapWX=require('./../../utils/qqmap-wx-jssdk.min.js');
const wxMap = new QQMapWX({
  key: 'QHSBZ-4GC6K-6ZCJ6-ANWGW-U2F37-PMBEU'
});    
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pleashoader:'北京烤鸭',//定位位置原始值
    array:['美食','美团超市','生疏果鲜','美团专送','跑腿代购','下午茶','披萨汉堡','家常菜','小吃馆','快食简餐'],//导航中全部列表
    loaction:'',//获得的位置
    activeItem:0,//筛选原始获得焦点item
    showover:false,//是否显示筛选选项
    overalldata:[],//筛选选项中的列表
    list:[],//保存商品列表中的数据
    tabNavItem:0,//筛选列表获得的下标
    showloading:false,//显示商品列表加载的列表
    showlast:false,//标识是否加载到最后一个
    const:0,//记录页数
    navheight:0,//记录nav导航的高度
    autoinputSearch:true,//记录当滚动到一定程度隐藏地点信息
    isfilexd:false,//标识是否关闭模态框
    filterdata:[],//筛选模态框中的数据列表
    showfillter:false,//筛选模态框的显示与隐藏
    activelist:[]//初始化筛选弹框选择的项列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  swiperitem(){
    let con=Math.floor((Math.random()*5));
    push('search',{con});
  },
  onLoad: function (options) {
    wx.showLoading({
      title:'正在拼命加载中...',
      mask:true
    })
    this.sendajax().then(res=>{
      wx.hideLoading();
    });
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=QHSBZ-4GC6K-6ZCJ6-ANWGW-U2F37-PMBEU&get_poi=1";
        wx.request({
          url:getAddressUrl,
          success(res){
            console.log(res);
            that.setData({
              loaction:res.data.result.formatted_addresses.recommend
            })
          }
        })
      },
    })
  },
  closeisisfilexd(){
    console.log(this.data.showover);
    this.setData({
      isfilexd:false,
      showfillter:false,
      showover:false
    })
  },
  closefilterdlg(){
    this.setData({
      showfillter:false
    })
  },
  togglefilexd(res){
    this.setData({
      isfilexd:res.detail,
    })
  },
  sendajax:function(){
    let param={}
    param['const']=this.data.const;
    return new Promise((resolve,reject)=>{
      getIndexlistInfo(param).then(res=>{
        let arr=res.data.data.list,datalist=this.data.list;
        if(arr.length==0){
          reject()
        }
        for(let i=0;i<arr.length;i++){
          datalist.push(arr[i]);
        }
        this.setData({
          list:datalist
        })
        this.setData({
          const:this.data.const++
        })
        resolve()
        wx.hideLoading();
      })
    })
  },
  resetindex(res){//筛选首页商品列表
    console.log(res);
   this.setData({
    isfilexd:false,
    showover:false
   })
   if(res.detail==3){
     this.setData({
       showfillter:true,
     })
     if(this.data.filterdata.length==0){
       getfilterlist().then(res=>{
        let list=res.data.data.data;
        for(let i=0;i<list.length;i++){
          if(list[i].type=='choice'){
            list[i].list=list[i].list.map(n=>{
                let obj={};
                obj['style']=false;
                Object.assign(obj,{
                  ...n
                })
                return obj;
              })
          }
        }
         this.setData({
           filterdata:list
         })
       })
     }
     return;
   }
    let param={}
    Object.assign(param,{
      const:Math.floor(Math.random()*5)
    })
    getIndexlistInfo(param).then(res=>{
        this.setData({
          list:res.data.data.list
        })
    },err=>{
      console.log(err);
    })
  },
  seccessfilter(e){
    let param={}
    Object.assign(param,{
      const:Math.floor(Math.random()*5)
    })
    getIndexlistInfo(param).then(res=>{
      this.setData({
        list:res.data.data.list
      })
    })
    this.setData({
      showfillter:false
    })
  },
  selectSort(e){
    let item=e.target.dataset.index;
    this.setData({
      tabNavItem:item
    })
  },
  callSomeFun(res){
    if(res.detail.myMark==0){
      this.setData({
        showover:true
      })
      getoverall().then(res=>{
        this.setData({
          overalldata:res.data.data.list,
        })
      })
    }else{
      this.setData({
        showover:false,
        showfillter:false
      })
    }
  },
  showloaction(){
    var that=this;
    wx.chooseLocation({
      success(res){
       that.setData({
         loaction: res.address
       })
      console.log(that.data.loaction);
      }
    })
  },
  onPageScroll(e){
    if(e.scrollTop>=this.data.navheight){
      if(this.data.autoinputSearch){
        this.setData({
          autoinputSearch:false
        })
      }
    }else{
      if(!this.data.autoinputSearch){
        this.setData({
          autoinputSearch:true
        })
      }
    }
  },
  islogin(){
    wx.getSetting({
      complete: (res) => {
        console.log(res);
      },
    })
    wx.getUserInfo({
      complete: (res) => {
        console.log(res);
      },
    })
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
    let selQuery = wx.createSelectorQuery().select('.nav');
    selQuery.boundingClientRect().exec(res=>{
      this.setData({
        navheight:res[0].height
      })
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
  //点击搜索框调用函数
  opensearch(){
    push('search');
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      const:0,
      list:[],
      showlast:false,
      
    })
    wx.showNavigationBarLoading();
    this.sendajax().then(res=>{
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    })
  },
  _cancelEvent(){
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      showloading:true,
      const:1
    })
    this.sendajax().then(res=>{
      this.setData({
        showloading:false
      })
    },err=>{
      this.setData({
        showlast:true
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
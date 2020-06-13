// pages/ceshi/ceshi.js
// import store from './../../store/store'
import store from './../../store/store'
import {getIndexlistInfo,getoverall,getfilterlist} from './../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:['麻辣烫','饺子','米线','面','汉堡','魏家凉皮','麻辣拌','炒饭','啤酒','肯德基'],//热门搜索数据列表
    pleashoder:'曼玲粥店(东单店)',//pleashoder中的占位符
    historylist:[],//历史搜索中的列表
    innersearch:null,//搜索框所绑定的value值
    showalert:false,//是否要显示弹出框
    title:'清除历史记录?',//弹出框的提示文字
    showitem:true,//是显示搜索列表还是显示商品列表
    showover:false,//tab页面是否要固定定位
    storeInfo:{},//传给商品列表的数据
    isfilexd:false,//标识是否关闭模态框
    showfillter:false,//筛选模态框的显示与隐藏
    overalldata:[],//筛选选项中的列表
    filterdata:[],//筛选模态框中的数据列表
    activelist:[],//初始化筛选弹框选择的项列表
    nodefiexd:true,//阻止tab组件固定定位和改变排序框的位置
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // this.search(options.con);
    this.setData({
      historylist:store.historylist
    })
  },
  search(e,resout){
    console.log(resout);
    wx.showNavigationBarLoading()
    getIndexlistInfo({const:1}).then(res=>{
      wx.hideNavigationBarLoading();
      this.setData({
        showitem:false,
        storeInfo:res.data.data.list
      })
    })
    if(resout) return;
    let tar=this.data.historylist;
    let res=this.data.innersearch||this.data.pleashoder
    if(tar.includes(res)) return;
    tar.push(res)
    this.setData({
      historylist:tar
    })
    store.historylist=tar
  },
  togglefilexd(res){
    console.log(res);
    this.setData({
      isfilexd:res.detail
    })
    
  },
  closefilterdlg(){
    this.setData({
      showfillter:false,
      showover:false
    })
  },
  seccessfilter(e){
    let param={}
    Object.assign(param,{
      const:Math.floor(Math.random()*5)
    })
    getIndexlistInfo(param).then(res=>{
      console.log(param);
      this.setData({
        storeInfo:res.data.data.list
      })
    })
    this.setData({
      showfillter:false
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
      console.log(res.data)
        this.setData({
          storeInfo:res.data.data.list
        })
    },err=>{
      console.log(err);
    })
  },
  togglefilexd(res){
    this.setData({
      isfilexd:res.detail
    })
  },
  onClickBaseComponent(res){
    this.setData({
      showalert:false
    })
    if(res.detail=='ok'){
      this.setData({
        historylist:[]
      })
      store.historylist=[]
    }
  },
  showdlg(){
    this.setData({
      showalert:true
    })
  },
  onClickHot(e){
    this.search('res')
    let target=e.currentTarget.dataset.item,list=this.data.historylist;
    this.setData({
      innersearch:target
    })
    list.push(target);
    this.setData({
      historylist:list
    })
    store.historylist=list
  },
  callSomeFun(res){
    if(res.detail.myMark==0){
      this.setData({
        showover:true
      })
      getoverall().then(res=>{
        this.setData({
          overalldata:res.data.data.list
        })
      })
    } else{
      this.setData({
        showover:false,
        showfillter:false
      })
    }
  },
  closeisisfilexd(){},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onDeleteKey(){
    console.log(123456)
    this.setData({
      innersearch:null
    })
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
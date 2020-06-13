// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isfilexd:{
      type:Boolean,
      value:false
    },
    showfillter:{
      type:Boolean,
      type:false
    },
    nodefiexd:{
      type:Boolean,
      type:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navArray:['综合排序','销量最高','速度最快','筛选'],//筛选列表
    activeItem:null,//标识是第几个item高亮
    scrollTop:null,//标识滚动的距离
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleActive(e){//控制tab菜单展示

     
      this.triggerEvent('callSomeFun',e.mark)
      console.log(e.currentTarget.offsetTop-30);
     this.setData({
      scrollTop: e.currentTarget.offsetTop-30||this.data.scrollTop
     })
     let scrollTop=e.mark.myMark==0?this.data.scrollTop:this.data.scrollTop
     if(e.mark.myMark==0){
       this.triggerEvent('togglefilexd',true)
    }else{
      this.triggerEvent('resetindex',e.mark.myMark);
      this.triggerEvent('togglefilexd',false)
    }
      wx.pageScrollTo({
        scrollTop,
        duration: 300,
      });
      this.setData({
        activeItem: e.mark.myMark
      })
    },
    closeisisfilexd(){
      
     
    }
  }
})

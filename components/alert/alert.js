// components/alert/alert.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{
        type:String,
        value:''
      },
      showalert:{
        type:Boolean,
        value:true
      },
      toph:{
        type:Boolean,
        value:false
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickBaseComponent(e){
      console.log(e.currentTarget.dataset.action);
      this.triggerEvent('onClickBaseComponent',e.currentTarget.dataset.action)
    },
    clackdlg(){
      this.triggerEvent('onClickBaseComponent')
    }
  }
})

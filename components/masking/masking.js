// components/masking/masking.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maskingShow:{
      type:Boolean,
      value:true
    },
    toph:{
      type:Boolean,
      value:true
    },
    nodefiexd:{
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
    stopscroll(){
      return true
    },
    closedla(e){    
        this.triggerEvent('closeisisfilexd')
    }
  }
})

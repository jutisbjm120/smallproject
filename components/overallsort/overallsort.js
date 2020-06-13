// components/overallsort/overallsort.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showover:{
      type:Boolean,
      value:false
    },
    data:{
      type:Array,
      value:[],
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
    activeItem:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    filterOnClickSortType(e){
      this.setData({
        activeItem:e.target.dataset.index,
      })
      this.triggerEvent('resetindex',e.target.dataset.type)
    },
    closeisisfilexd(){
      this.triggerEvent('closeisisfilexd')
    }
  }
})

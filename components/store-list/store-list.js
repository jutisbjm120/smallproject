import {push} from  './../../router/index'
Component({
  options: {  
    multipleSlots: true 
  },  
  properties:{
    storeInfo:{
      'type':Object,
      'value':null
    }
  },
 data:{
  
 },
 methods: {
   togglesele(){
    this.setData({
      isActive: !this.data.isActive
    })
  },
  detailpage(e){
    push('shoplist',e.currentTarget.dataset.info)
  }
 }
})
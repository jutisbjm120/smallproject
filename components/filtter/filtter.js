// components/filtter/filtter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showfillter:{
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
    activeInfo:[],
    activetype:null//单选模式下的选择的列表项
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeisisfilexd(){
      this.triggerEvent('closefilterdlg')
    },
    selectfilter(e){
      this
      if(e.currentTarget.dataset.select=='choice'){
        let keyname=e.currentTarget.dataset.type;
        let target=JSON.parse(JSON.stringify(this.data.data));
       for(let i=0;i<target.length;i++){
          if(target[i].type=="choice"){
            for(let j=0;j<target[i].list.length;j++){
              let type=target[i].list[j]['type'],style=target[i].list[j]['style'];
              if(type==keyname){
                target[i].list[j]['style']=!style;
                this.addselect(target[i].list[j]);
              }
            }
          }
       }
        this.setData({
          data:target
        })
      }else{
        let activetype=null;
        if(this.data.activetype!=e.currentTarget.dataset.type){
          activetype=e.currentTarget.dataset.type
        }
        this.addselect(e.currentTarget.dataset);
        this.setData({
          activetype
        })
      }
    },
    addselect(target){
      let activeInfo=this.data.activeInfo;
      console.log(target);
        if(target.select){
          let type=target.type;
          let index= activeInfo.findIndex(n=>n.type==type);
          let indexItem=activeInfo.findIndex(n=>n.select),isadd=true;
          if(index>=0){
            activeInfo.splice(index,1);
            isadd=false
          }
          if(indexItem>=0){
            activeInfo.splice(indexItem,1);
          }
          isadd&&activeInfo.push(target);
        }else{
            if(target.style){
              activeInfo.push({type:target.type,mag:target.mag})
            }else{
              let index=activeInfo.findIndex(n=>n.type==target.type);
              activeInfo.splice(index,1);
            }
        }
        this.setData({
          activeInfo
        })
    },
    clearfilter(){
      let target=this.data.data;
      for(let i=0;i<target.length;i++){
        if(target[i].type=='choice'){
          target[i].list=target[i].list.map(n=>{
            n.style=false;
            return n;
          })
        }
      }
      this.setData({
        data:target,
        activetype:null,
        activeInfo:[]
      })
    },
    seccessfilter(){
      this.triggerEvent('seccessfilter',this.data.activeInfo);
      this.clearfilter();
    }
  }
})

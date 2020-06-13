//js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code:null,
    mylist:[{
      title:'美团红包',
      icon:'/image/envelop.png'
    },{
      title:'商家代金券',
      icon:'/image/service.png'
    },{
      title:'津贴',
      icon:'/image/qualification.png'
    },{
      title:'我的地址',
      icon:'/image/mine-near.png'
    },{
      title:'我的关注',
      icon:'/image/tag.png'
    },{
      title:'我的评价',
      icon:'/image/mine-phone.png'
    },{
      title:'发票助手',
      icon:'/image/privacy-help-icon.png'
    },{
      title:'邀请有奖',
      icon:'/image/mine-invite.png'
    },{
      title:'客服中心',
      icon:'/image/phone.png'
    },{
      title:'帮助与反馈',
      icon:'/image/question-mark.png'
    },{
      title:'协议与说明',
      icon:'/image/mine-service.png'
    },{
      title:'修改手机号',
      icon:'/image/phone-number.png'
    },{
      title:'餐饮加盟',
      icon:'/image/mine-phone.png'
    }]
  },
  onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      complete: (res) => {
        console.log(res)
      },
    })
   wx.getUserInfo({
     complete: (res) => {
       console.log(res);
     },
   })
  },
  getPhoneNumber(e){
    wx.request({
      url: './../../utils/login.php',
      data:{

      },
      success(){}
    })
    console.log(e);
  }
})
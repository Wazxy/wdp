var app=getApp();
var userinfo = [];
var judge = true;
Page({
  data: {
    username: '',
    password: '',
    
  },
  onLoad(){
    
  },

  userInfoHandler: function(){
    wx.reLaunch({
      url: '/pages/base/base',
    })
    wx.setStorage({
      key: 'auth',
      data: true,
    })
          
  }

})
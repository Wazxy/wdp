//app.js
App({
  onLaunch: function () {
    this.getUserInfo()
    wx.getStorage({
      key: 'auth',
      success: function(res) {
        if(res.data){
          wx.reLaunch({
            url: '/pages/user/user',
          })
        }
        else{
          wx.getSetting({
            success: function (res) {
              console.log(res.authSetting['scope.userInfo'])
              wx.setStorage({
                key: 'auth',
                data: res.authSetting['scope.userInfo'],
              })
              if (res.authSetting['scope.userInfo']){
                wx.reLaunch({
                  url: '/pages/user/user',
                })
              }

            }
          })
        }
      },
    })
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log(res.userInfo)
            },
            fail:function(res){
              console.log(res)
            }
          })
          var code = res.code;
          if (code) {
            console.log('获取用户登录凭证：' + code);
            wx.request({
              url: 'https://sy.uestcsise.cn/api/onlogin',
              data: { code: code},
              success: function (res) {
                console.log(res.data)
                that.globalData.userid = res.data.openid
                console.log(that.globalData.userid)
                wx.getUserInfo({
                  success: function (res) {
                    var userInfo = res.userInfo
                    wx.request({
                      url: 'https://sy.uestcsise.cn/api/user/' + that.globalData.userid,
                      method: "put",
                      data: {
                        name: userInfo.nickName
                      },
                      success: function (res) {
                        console.log(res.data)
                      }
                    })
                  },
                  fail: function (res) {
                    console.log(res)
                  }
                })
                wx.request({
                  url: 'https://sy.uestcsise.cn/api/login',
                  method:"POST",
                  data:{
                    userId: that.globalData.userid
                  },
                  success: function (res) {
                    console.log(res.data)
                    if(!res.data.success){
                      wx.request({
                        url: 'https://sy.uestcsise.cn/api/register',
                        method: "POST",
                        data: {
                          userId: that.globalData.userid
                        },
                        success: function (res){
                          console.log(res.data)
                        }
                      })
                    }
                  }

                })
              }
            })
          } else {
            console.log('获取用户登录态失败：' + res.errMsg);
          }
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    userid: null
  }
})
// pages/user/mywrite/mywrite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    body: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  },
  titleinput: function(e){
    var that = this;
    that.setData({
      title: e.detail.value
    })
    console.log(this.data.title)
  },
  contentinput: function(e){
    var that = this;
    that.setData({
      body:e.detail.value
    })
    console.log(this.data.body)
  },
  write: function(){
    var that = this;
    var userid = getApp().globalData.userid;
    console.log(userid)
    if (that.data.title.length == 0 || that.data.body.length == 0) {
      wx.showToast({
        title: '不能为空',
        icon: 'loading',
        duration: 2000
      })
    }
    else{
      wx.request({
        url: 'http://sy.uestcsise.cn/api/articles/'+userid,
        data: {
          title : that.data.title,
          body : that.data.body
        },
        method : "POST",
        success: function(res){
          if (res.data.success == true) {
            var that2 = res.data
            console.log(that2.message)
            wx.showToast({
              title: 'res.data.message',
              icon: "success"
            })
            wx.switchTab({
              url: '/pages/user/user',
              success: function (e) {
                var page = getCurrentPages().pop()
                if (page == undefined || page == null) {
                  return
                }
                page.onLoad()
              }
            })
          }
          else {
            console.log(res.data)
            wx.showToast({
              title: '上传失败',
              icon: "none"
            })
          }
        },
        fail: function (res){
          console.log(res)
        }
      })
    }
  }
})
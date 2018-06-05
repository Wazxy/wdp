// pages/user/myarticle/revise.js
var articleid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'article',
      success: function (res) {
        that.setData({
          article: res.data
        })
        console.log(res.data)
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    that.setData({
      article: that.data.article,
    })
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
    this.data.article.title = e.detail.value
  },
  contentinput: function(e){
    this.data.article.body = e.detail.value
  },
  xiugai: function(){
    var that = this;
    wx.getStorage({
      key: 'articleid',
      success: function(res) {
        articleid = res.data;
        var url = 'http://sy.uestcsise.cn/api/article/' + articleid
        wx.request({
          url: url,
          data: that.data.article,
          method: "PUT",
          success: function(res){
            if (res.data.success == true) {
              var that2 = res.data.msg
              console.log(that2)
              wx.showToast({
                title: res.data.msg,
                icon: "success"
              })
              // wx.setStorage({
              //   key: 'back',
              //   data: true,
              // })
              wx.navigateBack({
                delta: 3
              })
            }
            else {
              console.log(res.data)
              wx.showToast({
                title: "修改失败",
                icon: "none"
              })
            }
          },
          fail: function(res){
            console.log(res);
          }
        })
      },
    })
  }

})
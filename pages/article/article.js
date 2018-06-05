// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    articlelist: [],
    // 显示加载更多 loading
    morehidden: true,
    i: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getlist();
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

  getlist: function(){
    var that = this;
    var str = 'http://sy.uestcsise.cn/api/articles'
    that.setData({
      url: str
    })
    wx.request({
      url: that.data.url,
      method: "GET",
      success: function(res){
        if (res.data.success == true) {
          var that2 = res.data
          console.log(that2.data)
          that.setData({
            articlelist: that2.data
          })

        }
        else {
          console.log(res.data)
          wx.showToast({
            title: "连接失败",
            icon: "fail"
          })
        }
      },
      fail: function(res){
        console.log(res);
      }

    })
  },
  upper: function(){
    var that = this;
    wx.showNavigationBarLoading()
    that.getlist();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function () {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  message: function(e){
    wx.navigateTo({
      url: './message',
    })
    var articleId = e.currentTarget.dataset.articleid
    wx.setStorage({
      key: 'articleId',
      data: articleId
    })
    console.log(articleId)
  },
  nextLoad: function () {
    console.log("continueload");
    
  }
})
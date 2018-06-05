// pages/article/message.js
var api = 'http://sy.uestcsise.cn/api/article/';
var articleId = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,   // 设备高度
    data: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getmessage()
    

    /**
         * 获取系统信息
         */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }
    });
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
  getmessage: function(){
    var that = this;
    wx.getStorage({
      key: 'articleId',
      success: function (res) {
        articleId = res.data;
        var url = api + articleId
        wx.request({
          url: url,
          method: "GET",
          success: function (res) {
            if (res.data.success == true) {
              var that2 = res.data
              console.log(that2.data)
              that.setData({
                data: that2.data
              })

            }
            else {
              console.log(res.data)
              wx.showToast({
                title: "连接失败",
                icon: "none"
              })
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
    })
  }
})
// pages/myInfo/myInfo.js.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    detailInfo: {},
    hasUserInfo: false,
    userStateObj: {
      0: '离线',
      1: '在线',
      2: '忙碌',
      3: '离开',
      4: '打盹',
      5: '期待交易',
      6: '想玩游戏'
    }
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: this.data.detailInfo.profileurl
    // })
    // wx.miniProgram.navigateTo({ url: this.data.detailInfo.profileurl })
  },
  onLoad: function () {
    this.getDetailInfo();
  },
  // 查询用户详情
  getDetailInfo: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002',
      data: {
        key: app.globalData.steamKey,
        steamIds: app.globalData.steamId
      },
      success: res => {
        console.log(res)
        let tempInfo = [];
        if (res.statusCode == 200) {
          this.setData({
            detailInfo: res.data.response.players[0]
          })
        }
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDetailInfo();
  }
})
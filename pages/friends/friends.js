// pages/friends/friends.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendInfoList: [],
    friendList: [],
    userStateObj: {
      0: { name: '离线', className: 'state-offline'},
      1: { name: '在线', className: 'state-online' },
      2: { name: '忙碌', className: 'state-busy' },
      3: { name: '离开', className: 'state-leave' },
      4: { name: '打盹', className: 'state-dndst' },
      5: { name: '期待交易', className: 'state-deal' },
      6: { name: '想玩游戏', className: 'state-play' }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFriendList();
  },

  // 获取好友steamID列表
  getFriendList: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.steampowered.com/ISteamUser/GetFriendList/v0001/',
      data: {
        key: app.globalData.steamKey,
        steamId: app.globalData.steamId,
        relationship: 'friend'
      },
      success: res => {
        if (res.statusCode == 200) {
          const friendArray = res.data.friendslist.friends;
          let friendResult = [];
          friendArray.forEach(function(v, i) {
            friendResult.push(v.steamid)
          });
          // this.setData({
          //   friendList: friendResult
          // });
          this.getFriendDetailList(friendResult);
        }
        wx.hideLoading();
      }
    })
  },

  // 获取好友详情列表
  getFriendDetailList: function (list) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002',
      data: {
        key: app.globalData.steamKey,
        steamIds: list
      },
      success: res => {
        console.log(res)
        let tempList = [];
        if (res.statusCode == 200) {
          tempList = res.data.response.players;
          // 动态设置className
          // 先按照状态排序，然后根据steamid排序
          tempList.sort(function (a, b) {
            if (b.personastate == a.personastate) {
              return b.steamid - a.steamid;
            } else {
              return b.personastate - a.personastate
            }
          })
        }
        this.setData({
          friendList: tempList
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
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
    // wx.startPullDownRefresh();
    this.getFriendList();
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
  
  }
})
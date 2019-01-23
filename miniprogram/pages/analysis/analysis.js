var wxCharts = require('../../utils/wxcharts')
const DB = require('../../db/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeArr: ['餐饮', '交通', '居家', '缴费', '医药', '人际', '娱乐'],
    billsData: [
      { name: '餐饮', data: 0 },
      { name: '交通', data: 0 },
      { name: '居家', data: 0 },
      { name: '缴费', data: 0 },
      { name: '医药', data: 0 },
      { name: '人际', data: 0 },
      { name: '娱乐', data: 0 }
    ],
    classArr: ['item-food', 'item-trans', 'item-home', 'item-fee', 'item-med', 'item-friend', 'item-ent'],
    billsTotal: 0
  },
  loadBills: function(e) {
    const self = this

    wx.cloud.callFunction({
      name: 'getBills',
      complete: res => {
        console.log('res', res)
        const data = {
          billsData: self.data.billsData,
          billsTotal: self.data.billsTotal
        }
        res.result.data.forEach((item, index, arr) => {
          data.billsData[item.type[0]].data += (item.number)
          data.billsTotal += (item.number)
        })
        console.log(data)
        self.setData(data)
        self.drawPie()
      }
    })
  },
  drawPie: function(e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: this.data.billsData,
      width: windowWidth,
      height: 300,
      dataLabel: false,
      offsetAngle: 90,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadBills()
  },
  allgongsi: function () {
    wx.navigateTo({
      url: '../allhiscompanies/allhiscompanies'
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
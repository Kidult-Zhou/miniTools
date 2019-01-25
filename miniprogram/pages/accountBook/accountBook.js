const DB = require('../../db/index.js')
const consts  = require('../../consts/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      consts.firstType,
      consts.typeArr[0]
    ],
    multiIndex: [0, 0],
    number: 0,
    remark: '',
    date: ''
  },
  bindMultiPickerChange: function(e) {
    console.log('typeChange', e)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('typeColumnChange', e.detail)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    data.multiArray[1] = consts.typeArr[data.multiIndex[0]]
    this.setData(data)
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  numberInput: function(e) {
    this.setData({
      number: e.detail.value
    })
  },
  remarkInput: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  queryDb: function(e) {
    const db = wx.cloud.database({
      env: 'tes-6fb6e5'
    })
    const bills = db.collection('bills')
    bills.doc('XA9uQVsqTi00tka8').get({
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
    console.log(bills)
  },
  addBill: function(e) {
    const db = wx.cloud.database({
      env: 'tes-6fb6e5'
    })
    db.collection('bills').add({
      data: {
        number: this.data.number * 100,
        remark: this.data.remark,
        type_f: this.data.multiIndex[0],
        type_s: this.data.multiIndex[1],
        date: new Date(this.data.date).getTime()
      },
      success(res) {
        wx.showToast({
          title: '添加成功',
        })
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
      }
      return fmt
    }
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
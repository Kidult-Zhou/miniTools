const DB = require('../../db/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      ['餐饮', '交通', '居家', '缴费', '医药', '人际', '娱乐'],
      ['早饭', '午饭', '晚饭', '夜宵', '买菜', '水果', '零食']
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
    switch (data.multiIndex[0]) {
      case 0:
        data.multiArray[1] = ['早饭', '午饭', '晚饭', '夜宵', '买菜', '水果', '零食']
        break
      case 1:
        data.multiArray[1] = ['公交卡', '打车', '动车高铁', '加油', '车辆保养', '车险', '过路费']
        break
      case 2:
        data.multiArray[1] = ['日常用品', '衣物', '宠物', '家电', '数码']
        break
      case 3:
        data.multiArray[1] = ['水电', '物业', '房租', '房贷', '话费']
        break
      case 4:
        data.multiArray[1] = ['药品', '医院', '保健品']
        break
      case 5:
        data.multiArray[1] = ['份子钱', '红包', '请客', '礼物']
        break
      case 6:
        data.multiArray[1] = ['游戏', 'KTV', '门票', '电影', '电玩', '其他']
        break
    }
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
        type: this.data.multiIndex,
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
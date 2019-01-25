const consts = require('../../consts/index')
import { getStartEnd } from '../../utils/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      [ ...consts.firstType, '所有' ],
      [ '所有' ]
    ],
    multiIndex: [7, 0],
    bills: [],
    date: '',
    start: 0,
    end: 0,
    selectIndex: [-1, -1]
  },
  loadBills: function(e) {
    const self = this
    let selectIndex = []
    if (this.data.multiIndex[0] == 7) {
      selectIndex = [-1, -1]
    } else if (this.data.multiIndex[1] == this.data.multiArray[1].length - 1) {
      selectIndex = [this.data.multiIndex[0], -1]
    } else {
      selectIndex = this.data.multiIndex
    }
    wx.cloud.callFunction({
      name: 'getBills',
      data: {
        start: self.data.start,
        end: self.data.end,
        type: selectIndex
      },
      complete: res => {
        console.log('res', res)
        const data = {
          bills: []
        }
        let result = res.result.data
        result.forEach((item, index, arr) => {
          item.date = new Date(item.date).Format('yyyy-MM-dd')
          item.type = consts.typeArr[item.type_f][item.type_s]
        })
        data.bills = self.groupingData(result)
        console.log('before sort', data.bills)
        data.bills = data.bills.sort(self.dateSort)
        console.log('bills', data.bills)
        self.setData(data)
      }
    })
  },
  groupingData: function(arr) {
    let map = {},
        dest = [],
        length = arr.length
    for (let i = 0; i < length; i++) {
      let ai = arr[i]
      if (!map[ai.date]) {
        dest.push({
          date: ai.date,
          amount: ai.number,
          items: [ai]
        })
        map[ai.date] = ai
      } else {
        for (let j = 0; j < dest.length; j++) {
          let dj = dest[j]
          if (dj.date == ai.date) {
            dj.items.push(ai)
            dj.amount += ai.number
            break
          }
        }
      }
    }
    return dest
  },
  dateSort(a, b) {
    return a.date > b.date ? 1 : -1
  },
  bindMultiPickerChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    this.loadBills()
  },
  bindMultiPickerColumnChange: function(e) {
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    if (data.multiIndex[0] == 7) {
      data.multiArray[1] = [ '所有' ]
    } else {
      data.multiArray[1] = [ ...consts.typeArr[data.multiIndex[0]], '所有' ]
    }
    
    this.setData(data)
  },
  bindDateChange: function(e) {
    let time = getStartEnd(e.detail.value)
    this.setData({
      date: e.detail.value,
      start: time[0].getTime(),
      end: time[1].getTime()
    })
    this.loadBills()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = getStartEnd()
    this.setData({
      date: (new Date(Date.now())).Format('yyyy-MM'),
      start: time[0].getTime(),
      end: time[1].getTime()
    })
    this.loadBills()
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
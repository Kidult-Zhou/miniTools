Page({

  /**
   * 页面的初始数据
   */
  data: {
    bills: [],
    date: '',
    start: 0,
    end: 0,
    typeArr: [
      ['早饭', '午饭', '晚饭', '夜宵', '买菜', '水果', '零食'],
      ['公交卡', '打车', '动车高铁', '加油', '车辆保养', '车险', '过路费'],
      ['日常用品', '衣物', '宠物', '家电', '数码'],
      ['水电', '物业', '房租', '房贷', '话费'],
      ['药品', '医院', '保健品'],
      ['份子钱', '红包', '请客', '礼物'],
      ['游戏', 'KTV', '门票', '电影', '电玩', '其他'],
    ]
  },
  loadBills: function(e) {
    const self = this
    wx.cloud.callFunction({
      name: 'getBills',
      complete: res => {
        console.log('res', res)
        const data = {
          bills: []
        }
        let result = res.result.data
        result.forEach((item, index, arr) => {
          item.date = new Date(item.date).Format('yyyy-MM-dd')
          item.type = self.data.typeArr[item.type[0]][item.type[1]]
        })
        data.bills = self.groupingData(result).sort(self.dateSort)
        console.log('bills', data.bills)
        self.setData(data)
      }
    })
    // const db = wx.cloud.database({
    //   env: 'tes-6fb6e5'
    // })
    // const _ = db.command
    // db.collection('bills').where({
    //   _openid: getApp().globalData.openid,
    //   date: _.gte(self.data.start).and(_.lt(self.data.end))
    //   // number: _.gte(550).and(_.lt(640))
    // })
    // .get({
    //   success(res) {
    //     console.log('res', res)
    //     const data = {
    //       bills: []
    //     }
    //     res.data.forEach((item, index, arr) => {
    //       item.date = new Date(item.date).Format('yyyy-MM-dd')
    //       item.type = self.data.typeArr[item.type[0]][item.type[1]]
    //     })
    //     data.bills = self.groupingData(res.data).sort(self.dateSort)
    //     console.log('bills', data.bills)
    //     self.setData(data)
    //   },
    //   error(e) {
    //     console.log('error: ', e)
    //   }
    // })
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
    return a.date > b.date
  },
  bindDateChange: function(e) {
    let start = new Date(e.detail.value)
    let end = new Date(e.detail.value)
    start.setDate(1)
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)
    end.setDate(1)
    end.setHours(0)
    end.setMinutes(0)
    end.setSeconds(0)
    end.setMilliseconds(0)
    end.setMonth(end.getMonth() + 1)
    // let end = d.setMonth(d.getMonth() + 1).setDate(1)
    console.log(start.getTime(), end.getTime())
    this.setData({
      date: e.detail.value,
      start: start.getTime(),
      end: end.getTime()
    })
    this.loadBills()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let start = new Date(Date.now())
    let end = new Date(Date.now())
    start.setDate(1)
    start.setHours(0)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)
    end.setDate(1)
    end.setHours(0)
    end.setMinutes(0)
    end.setSeconds(0)
    end.setMilliseconds(0)
    end.setMonth(end.getMonth() + 1)
    console.log(start.getTime(), end.getTime())
    this.setData({
      date: (new Date(Date.now())).Format('yyyy-MM'),
      start: start.getTime(),
      end: end.getTime()
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
// pages/chooseLib/chooseLib.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-01-01',
    planList: [
      {
        num: 4100,
        month: 359,
        day: 4
      },
      {
        num: 2600,
        month: 30,
        day: 5
      }
    ],
    days: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    index: 0,
    income: 0,
    ext: 0,
    res: 8569,
    result: ''
  },
  bindPickerChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  clickAdd: function(e) {
    this.setData({
      planList: this.data.planList.concat([{ num: 0, month: 0, day: 1 }])
    })
  },
  clickDel: function(e, idx) {
    this.data.planList.splice(e.currentTarget.dataset.idx, 1)
    this.setData({
      planList: this.data.planList
    })
  },
  bindDayChange: function(e) {
    var tempDay = "planList[" + e.currentTarget.dataset.idx + "].day"
    this.setData({
      [tempDay]: this.data.days[e.detail.value],
      index: e.detail.value
    })
  },
  calcRes: function(e) {
    let inAll = this.data.income * this.calcMonth(10) + this.data.res + parseInt(this.data.ext)
    let outALl = 0
    for (let i = 0; i < this.data.planList.length; i++) {
      let plan = this.data.planList[i]
      if (!plan.num) continue
      let m = this.calcMonth(parseInt(plan.day))
      outALl += Math.min(m, plan.month) * plan.num
      console.log(plan.month, m)
    }
    this.setData({
      result: inAll - outALl
    })
    console.log(inAll - outALl)
  },
  calcMonth: function(n) {
    let today = new Date(Date.now())
    let startY = today.getFullYear()
    let startM = today.getMonth()
    let startD = today.getDate()
    let end = this.data.date.split('-')
    let endY = parseInt(end[0])
    let endM = parseInt(end[1]) - 1
    let endD = parseInt(end[2])

    let m = (endY - startY) * 12 + endM - startM

    if (startD > n && endD <= n) {
      --m
    } else if (startD <= n && endD > n) {
      ++m
    }
    console.log(startY, endY, startM, endM, m)

    return m
  },
  resInput: function(e) {
    this.setData({
      res: e.detail.value
    })
  },
  incomeInput: function (e) {
    this.setData({
      income: e.detail.value
    })
  },
  extInput: function (e) {
    this.setData({
      ext: e.detail.value
    })
  },
  numInput: function (e) {
    let temp = "planList[" + e.currentTarget.dataset.idx + "].num"
    this.setData({
      [temp]: e.detail.value
    })
  },
  monthInput: function (e) {
    let temp = "planList[" + e.currentTarget.dataset.idx + "].month"
    this.setData({
      [temp]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
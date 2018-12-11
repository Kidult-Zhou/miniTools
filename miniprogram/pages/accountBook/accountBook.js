Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [
      ['餐饮', '交通', '居家', '购物', '医药', '人际'],
      ['早饭', '午饭', '晚饭', '夜宵']
    ],
    multiIndex: [0, 0]
  },
  typeChange: function(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  typeColumnChange: function(e) {
    console.log(e.detail)
    const data = {
      types: this.data.types,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    switch (data.multiIndex[0]) {
      case 0:
        data.types[1] = ['早饭', '午饭', '晚饭', '夜宵']
        break
      case 1:
        data.types[1] = ['公交卡', '打车', '动车高铁']
        break
      case 2:
        data.types[1] = ['宠物', '水电', '物业', '房租', '房贷']
        break
      case 3:
        data.types[1] = ['超市', '零食', '衣物', '网购']
        break
      case 4:
        data.types[1] = ['药品', '医院', '保健品']
        break
      case 5:
        data.types[1] = ['份子钱', '红包', '请客']
        break
    }
    this.setData(data)
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
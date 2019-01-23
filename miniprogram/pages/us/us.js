Page({
  data:{
    countDown: '',
    animationData: ''
  },
  getCountDown: function() {
    let now = Date.now()
    let myDay = new Date()
    myDay.setFullYear(2019)
    myDay.setMonth(9)
    myDay.setDate(1)
    myDay.setHours(0)
    myDay.setMinutes(0)
    myDay.setSeconds(0)
    myDay.setMilliseconds(0)
    let count = (myDay.getTime() - now) / 1000
    let day = Math.floor(count / 86400)
    let h_c = count % 86400
    let hour = Math.floor(h_c / 3600)
    let m_c = h_c % 3600
    let minute = Math.floor(m_c / 60)
    let second = Math.floor(m_c % 60)
    this.setData({
      countDown: day + '天' + (hour < 10 ? '0' + hour : hour ) + '小时' + (minute < 10 ? '0' + minute : minute) + '分' + (second < 10 ? '0' + second : second) + '秒'
    })
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    setInterval(this.getCountDown, 1000)

    var story = "很久很久以前,有一个国王。";
    var i = 0;
    var self = this
    var time = setInterval(function () {
      var text = story.substring(0, i);
      i++;
      self.setData({
        animationData: text
      });
      if (text.length == story.length) {
        //   console.log("定时器结束！");
        clearInterval(time);
      }
    }, 200)
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})
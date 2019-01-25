// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'tes-6fb6e5'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { number, remark, type, date } = event

  db.collection('bills').add({
    data: {
      number: number,
      remark: remark,
      type_f: type[0],
      type_s: type[1],
      date: date
    },
    success(res) {
      return {
        data: [],
        errMsg: res
      }
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
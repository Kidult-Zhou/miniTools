// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: 'tes-6fb6e5'
})
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection('bills').count()
  const total = countResult.total

  const batchTimes = Math.ceil(total / MAX_LIMIT)

  const task = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('bills').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    task.push(promise)
  }

  return (await Promise.all(task)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg
  }))
}
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
  const {start, end, type} = event
  const _ = db.command

  const batchTimes = Math.ceil(total / MAX_LIMIT)

  const task = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db
      .collection('bills')
      .where({
        date: _.gte(start).and(_.lt(end)),
        type_f: (!type || type[0] == -1) ? _.neq(-1) : _.eq(type[0]),
        type_s: (!type || type[1] == -1) ? _.neq(-1) : _.eq(type[1])
      })
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get()
    task.push(promise)
  }

  return (await Promise.all(task)).reduce((acc, cur) => ({
    data: acc.data.concat(cur.data),
    errMsg: acc.errMsg
  }))
}
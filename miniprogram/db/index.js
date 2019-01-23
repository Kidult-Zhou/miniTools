var DB = {
  db: null,
  init: function() {
    this.db = wx.cloud.database({
      env: 'test-6fb6e5'
    })
    console.log('initSuccess', this.db)
  },
  add: function(table, data, success, fail) {
    this.db.collection(table)
      .add({
        data: data
      })
      .then(success)
      .catch(fail)
  },
  query: function(table, options, success, fail) {
    console.log(this.db)
    this.db.collection(table)
        .where(options)
        .get()
        .then(success)
        .catch(fail)
  }
}

module.exports = DB
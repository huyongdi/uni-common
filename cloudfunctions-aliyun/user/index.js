'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  // 获取 user 表的集合对象
  const collection = db.collection('user')
  let user
  // 查表
  user = await collection.where({
  	name: event.name,
  	pwd: event.pwd
  }).get()
  
  // affectedDocs 当做找到的个数
  if (user.affectedDocs < 1) {
  	return {
  		code: 500,
  		msg: '用户名或密码错误'
  	}
  } else {
  	return {
  		code: 201,
  		msg: 'success'
  	}
  }
}

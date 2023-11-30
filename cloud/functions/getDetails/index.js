const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  // 生成 collection 名称
  const collectionName = "homePage";
  // 新建 collection
  const collection = await db.getCollection(collectionName);
  console.log('连接成功： collection id:', collection.coll_id);

  // 查询 collection 中的 doc 列表，默认返回 100 条
  const docList = await db.collection(collectionName).where({id}).get();
  return docList
};
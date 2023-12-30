const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  var userid = event.userid;
  console.log("\nuserid\n")
  console.log(userid)
  // 初始化
  cloud.init();
  const db = cloud.database();
  // 生成 collection 名称
  const collectionName = "petsV2";
  // 新建 collection
  const collection = await db.getCollection(collectionName);
  console.log('连接成功： collection id:', collection.coll_id);

  // 查询 collection 中的 doc 列表，默认返回 100 条
  const docList = await db.collection(collectionName).where({
    _openid: userid
  }).get();
  
  console.log('当前 collection 中的 doc 列表:');
  console.log(docList);

  // 提取 pet 对象并组成数组
  const petArray = docList.map(doc => {
    const { records, ...pet } = doc.pet;
    return pet;
  });
  
  return petArray;
};
const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

// const getCollectionName = () => {
//   return 'cl-' + crypto.randomBytes(5).toString('hex');
// };
exports.main = async (event, context) => {
  // 初始化
  cloud.init();
  const db = cloud.database();
  // 生成 collection 名称
  
  const collectionName = "homePage";
  console.log('新建 collection:', collectionName);
  // 新建 collection
  // const collection = await db.createCollection(collectionName);
  // console.log('新建 collection id:', collection.coll_id);
  // 向 collection 添加 doc
  // console.log(db.collection(collectionName).doc());
  // console.log('新建 doc id:', doc._id);
  // 查询 collection 中的 doc 列表，默认返回 100 条
  // const len = await db.collection(collectionName).where({}).count();
  // console.log(len);
  // await db.collection(collectionName).add({
  //   data: {
  //     tuijian: {author: 'Jinlu', text: "abcd", title: "标题", Cover: "https://s2.loli.net/2023/11/16/ceQubgZ5BlWwO8K.png", love: "", num: 0, id: len.total}
  //   }
  // });
  const docList = await db.collection(collectionName).get();

  let data = docList;
  return data;
};
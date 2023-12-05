const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  var data = event;
  await db.collection("homePage").add({
    data: {
      tuijian: {
        id: data.id,
        num: data.loveNum,
        love: "",
        text: data.content,
        Cover: data.coverList,
        title: data.title,
        author: data.author
      }
    }
  })
  return data;
};
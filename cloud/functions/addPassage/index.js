const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  var data = event;
  await db.collection("homePage").add({
    data: {
      tuijian: {
        Id: data.Id,
        id: data.id,
        num: data.loveNum,
        love: "",
        text: data.content,
        Cover: data.imageUrls,
        title: data.title,
        author: data.author,
        topic: data.topic,
        avatar: data.avatar,
        time: data.time,
      }
    }
  })
  return data;
};
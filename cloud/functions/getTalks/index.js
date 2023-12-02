const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  console.log(event);
  cloud.init();
  const db = cloud.database();
  var passageId = event.passageId;
  var talkList = await db.collection("pageTalk").where({
    passageId: passageId
  })
  let data = talkList.get();
  return data;
};
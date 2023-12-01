const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  var data = event;
  await db.collection("pageTalk").add({
    data: {
      passageId: data.passageId,
      talkcontent: data.text,
      userName: data.userName,
      time: data.timeStamp
    }
  });

  console.log("调用了talk: ",data)
  return data;
};
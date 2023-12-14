const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  console.log(event);
  var num = event.newNum;
  // console.log(event);
  var id = event.id;

  db.collection("homePage").where({
    _id: id
  }).update({
    data: {
       tuijian: {
        num: num
       }
    }
  });

  let data = event;
  return data;

};
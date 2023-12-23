const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  console.log("\nevent:"+event);
  console.log("\ncontex:"+context);
  var userId = event.userId;
  var petId = 0;
  // 初始化
  cloud.init();
  const db = cloud.database();
  // 生成 collection 名称
  const collectionName = "petsDataAll";
  // 新建 collection
  const collection = await db.getCollection(collectionName);
  console.log('连接成功： collection id:', collection.coll_id);

  // 查询 collection 中的 doc 列表，默认返回 100 条
  const docList = await db.collection(collectionName).where({userId:0}).get();
  console.log('当前 collection 中的 doc 列表:', docList);
  var  data = docList.at(0); 
  // console.log('\n----data.userId:', data.pets);
  var face = {};
  var petsData =[];
  var cardTitles=[];
  var topRecords=[];
  data.pets.map((value,index)=>{
    petsData.push({
      age: value.age,
      birthday: value.birthday,
      gender: value.gender,
      name: value.name,
      weight: value.weight,
    });
    console.log("index------:"+index);
    if (index===petId) {
      value.records.map((value,index)=>{
        var one ={
          item1:{name:"",value:""},
          item2:{name:"",value:""},
          item3:{name:"",value:""},
          item4:{name:"",value:""},
          item5:{name:"",value:""},
          item6:{name:"",value:""}
        };
        value.value.map((value,index)=>{
          index = index -1;
          one["item"+index] = {name: "", value: ""}; // 初始化对象
          one["item"+index]["name"]=value.key;
          one["item"+index]["value"]=value.current+value.unit;
        });
      topRecords.push(one);
    })

    }
  });

  face ={
    petsData:petsData,
    topRecords:topRecords
  }
  // console.log('\n ------ petsData:', petsData);
  return face;
};
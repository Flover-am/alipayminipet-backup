const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');

const getCollectionName = () => {
  return 'cl-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  var userId = event.userId;
  var petId = event.petId;
  // userId = "0356yRkxnEL9IO7emgpU8AlqQMr_4_NNTXR0pBvzq5KPSk4";
  // petId = 0;
  // 初始化
  cloud.init();
  const db = cloud.database();
  // 生成 collection 名称
  const collectionName = "petsV2";
  // 新建 collection
  const collection = await db.getCollection(collectionName);
  console.log('连接成功： collection id:', collection.coll_id);

  // 查询 collection 中的 doc 列表，默认返回 100 条
  const docList = await db.collection(collectionName).where({_openid:userId}).get();
  console.log('当前 collection 中的 doc 列表:', docList);
  var  data = docList;
  // 把data中的元素的pet属性拿出来组成pets数组
  var pets = data.map((value,index)=>{
    return value.pet;
  });
  data.pets = pets;
  // return data.pets;
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
      avatar: value.petAvatar
    });
    console.log("\nindex------:"+index);
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
          index = index +1;
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
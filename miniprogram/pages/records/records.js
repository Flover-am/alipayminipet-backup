Page({
  data: {
    petsData: [],
    petsName:["12","23"],
    selectedPetId:0,
    defaultPet:{},
    // extra
    petData:{
      age: "4岁",
      birthday: "05月20日",
      gender: "公",
      name: "从众的阿西",
      weight: "12kg",
    },
    userId: 0,
    topRecords: [
      {
        item1:{
          name:"体重",
          value:"20斤"
        },
        item2:{
          name:"体温",
          value:"38℃"
        },
        item3:{
          name:"饮食",
          value:"200g"
        },
        item4:{
          name:"消费",
          value:"152RMB"
        },
        item5:{
          name:"小龙",
          value:"152RMB"
        },
        item6:{
          name:"小虎",
          value:"152RMB"
        },
      },
      {
        item1:{
          name:"name1",
          value:"20斤"
        },
        item2:{
          name:"name1",
          value:"20斤"
        },
        item3:{
          name:"name1",
          value:"20斤"
        },
        item4:{
          name:"name1",
          value:"20斤"
        },
      },
      {
        item1:{
          name:"name1",
          value:"20斤"
        },
        item2:{
          name:"name1",
          value:"20斤"
        },
        item3:{
          name:"name1",
          value:"20斤"
        },
        item4:{
          name:"name1",
          value:"20斤"
        },
      }
    ],
    cardTitles:[
      "日常记录",
      "健康记录",
      "洗护记录"
    ],
  },
  async onLoad() {
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getRecordFace',
      data:{
        userId: self.data.userId,
        petId: self.data.selectedPetId
      },
      success:function(res){
        console.log(res);
        self.setData({
          petsData:res.result.petsData,
          topRecords:res.result.topRecords
        });
        self.setData({
          petData:self.data.petsData[0],
        })
        self.setData({
          petsName: self.data.petsData.map((value,index)=>{
            return {
              value:index,
              label:value.name
            };
          })
        });
      }
    })
  },

  onPullDownRefresh() {

  },
  turn2summary(cardId,itemId){
    my.navigateTo({
      url: ''
    });
  },
  async onChangePetOk(value, column, e){
    this.setData({
      selectedPetId:value
    });
    var self = this; 
    this.setData({
      petData:self.data.petsData[self.data.selectedPetId]
    });

    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getRecordFace',
      data:{
        userId: self.data.userId,
        petId: self.data.selectedPetId
      },
      success:function(res){
        console.log(res);
        self.setData({
          petsData:res.result.petsData,
          topRecords:res.result.topRecords
        });
        self.setData({
          petData:self.data.petsData[0],
        })
        self.setData({
          petsName: self.data.petsData.map((value,index)=>{
            return {
              value:index,
              label:value.name
            };
          })
        });
      }
    })
  },
  textQH(value,column){
    return "切换宠物";
  },

  async addRecord(e) {
    console.log(e)
    my.navigateTo({
      url: "/pages/records/recordAdd/recordAdd",
      success:function(res) {
        console.log(res);
      }
    })
  }
});



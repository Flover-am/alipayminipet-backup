Page({
  data: {
    petsData: [],
    current:0,
    petsName:["12","23"],
    selectedPetId:0,
    defaultPet:{},
    // extra
    petData:{
      age: "0",
      birthday: "2024.1.1",
      arrivalDate:'',
      gender: "",
      name: "请在“我的”页面宠物中进行添加小动物",
      weight: "",
      avatar: ""
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
    alongTime:"···"
  },

  async onShow() {
    await this.getRecord();
    await this.calculateWithDate();
  },
  
  async onLoad() {
    await this.getRecord();
    await this.calculateWithDate();
  },
  
  async getRecord() {
    var self = this;
    var context = await my.getCloudContext();
    await this.getOpenId(context);
  
    return new Promise((resolve, reject) => {
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
          resolve();
        },
        fail: function(error) {
          reject(error);
        }
      });
    });
  },
  
  async calculateWithDate(){
    var self = this;
    var context = await my.getCloudContext();
    console.log("qqq")
    console.log(this.data.petData)
  
    return new Promise((resolve, reject) => {
      context.callFunction({
        name: 'calculateWithDate',
        data:{
          arriveDate: this.data.petData.arrivalDate
        },
        success:function(res){  
          console.log(res);
          self.setData({
            alongTime:res.result
          });
          resolve();
        },
        fail: function(error) {
          reject(error);
        }
      });
    });
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
          petData:self.data.petsData[self.data.selectedPetId],
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
    var self = this
    my.navigateTo({
      // url: `/pages/records/recordAdd/recordAdd?petid=5&userid=fff`,
      url: `/pages/records/recordAdd/recordAdd?petId=${self.data.selectedPetId}&userid=${self.data.userId}`,
    })
  },

  changeCurrent(current,isChanging){
    this.setData({
      current:current.detail.current
    });
  },
  async getOpenId(context) {
    return new Promise((resolve, reject) => {
      context.callFunction({
        name: 'getOpenId',
        data: {},
        success: (res) => {
          this.setData({
            userId: res.result.OPENID
          });
          resolve();
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },
});



Page({
  data: {
    petsData: [],
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
    ]
  },
  async onLoad() {
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getPets',
      success:function(res) {
        my.hideLoading();
        self.setData({
          petsData: res.result.data
        })
      }
    })
  },

  onPullDownRefresh() {

  }
});

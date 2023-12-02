Page({
  data: {
    passageId: 0,
    passage: [],
    autoplay: true,
    vertical: false,
    interval: 1000,
    circular: false,
    duration: 1500,
    talkList: [],
    talk: ""
  },
  async onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    var self = this;

    eventChannel.on('PageMain_Data',data => {
      console.log(data);
      self.setData({
        passage: data
      })
    })
    var context = await my.getCloudContext();
    context.callFunction({
      name: "getTalks",
      data: {"passageId": self.data.passage.data.tuijian.id},
      success:function(res) {
        console.log(res);
        self.setData({
          talkList: res.result
        })
      }
    });

  },
  async talkInput(event) {

    console.log(event);
    var text = event.detail.value;
    var self = this;
    this.setData({
      talk: text

    })
  },
  async submit(e) {
    var app = getApp(); 
    var talkuserName = app.globalData.userName;
    console.log(app.globalData); 
    var self = this;
    var context = await my.getCloudContext();


    var time = (await my.getServerTime()).time;
    console.log(time);
    var date = new Date(time).toDateString();
    
    var passageId = self.data.passage.data.tuijian.id;
    var tempTalk = self.data.talk;
    console.log(date);
    context.callFunction({
      name: "talk",
      data: {"text": self.data.talk, "userName": talkuserName, "passageId": passageId, "timeStamp": date},
      success:function(res){
        console.log(res);
        console.log("成功评论");
        self.setData({
          talk: ""
        })

      }
    })
    var tempList = self.data.talkList;
    tempList.push({
      time: date,
      passageId: passageId,
      talkcontent: tempTalk
    })
  }

});

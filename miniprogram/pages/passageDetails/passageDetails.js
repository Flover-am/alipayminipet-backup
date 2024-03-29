Page({
  data: {
    passageId: 0,
    passage: [],
    loveNum: 0,
    circular: true,
    duration: 1500,
    talkList: [],
    talk: "",
    // TODO: 是否点赞过（默认为false吗，还是说要存一下之前是否点赞过）
    isLoved: false,
  },
  onShow() {
    
  },

  async onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    var self = this;

    var app =getApp();
    console.log(app);
    

    eventChannel.on('PageMain_Data',data => {
      console.log(data);
      self.setData({
        passage: data
      })
    })
    self.setData({
      loveNum: self.data.passage.data.tuijian.num
    })
    var context = await my.getCloudContext();
    context.callFunction({

      name: "getTalks",
      data: {"passageId": self.data.passage.data.tuijian.Id},
      success:function(res) {
        console.log(res);
        self.setData({
          talkList: res.result
        })
      }
    });

  },
  // 点赞和取消点赞
  async addLove(e) {
    var self = this;
    var context = await my.getCloudContext();
    var newNum = self.data.loveNum + (self.data.isLoved ? -1 : 1);
    console.log(newNum);
    context.callFunction({
      name: "lovePassage",
      data: {
        id: self.data.passage.data._id,
        newNum: newNum
      },
      success:function(res){
        console.log(res);
        console.log("点赞成功");
        self.setData({
          loveNum: newNum,
          isLoved: !self.data.isLoved,
        })
        self.data.passage.data.tuijian.num  = self.data.loveNum;
      }
    })
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
    var talkuserName = app.globalData.nickName;
    console.log(app);
    if (talkuserName == '') {
      my.alert({
        title: '请先在“我的”界面点击登录'
      })
      return;
    }
    console.log(app.globalData); 
    var self = this;
    var context = await my.getCloudContext();


    var time = (await my.getServerTime()).time;
    console.log(time);
    var date = new Date(time).toDateString();
    
    var passageId = self.data.passage.data.tuijian.Id;
    var tempTalk = self.data.talk;
    console.log(date);
    var globalData = app.globalData
    console.log(globalData.avatar);

    if (globalData.userInfo.code == "40003") {
      my.alert({
        title: "请先登录授权"
      })
      return;
    }
    if (this.data.talk == ''){
      my.alert({
        title: '评论内容不能为空'
      })
      return;
    }
    
    context.callFunction({
      name: "talk",
      data: {
        "text": self.data.talk, 
        "userName": talkuserName, 
        "passageId": passageId, 
        "timeStamp": date,
        "avatar": globalData.avatar
      },
      success:function(res){
        console.log(res);
        console.log("成功评论");
        self.setData({
          talk: ""
        })

      }
    })
    self.data.talkList.push({
      time: date,
      passageId: passageId,
      talkcontent: tempTalk
    });
  },
  async onUnload(e) {
    my.navigateBack({
      success: function(res) {

      }
    })
  },

  async onPullDownRefresh(){
    console.log("进入刷新");
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: "getTalks",
      data: {"passageId": self.data.passage.data.tuijian.Id},
      success:function(res) {
        console.log(res.result);
        self.setData({
          talkList: res.result
        })
      }
    });
    setTimeout(() => {
      my.stopPullDownRefresh();
    }, 1000);

  },
  

  toUserPage(){
    //TODO:添加携带信息
    this.pageRouter.navigateTo({
      url:"/pages/user/user"
    })
  }

});

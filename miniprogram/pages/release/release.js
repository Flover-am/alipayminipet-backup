Page({
  data:{
    id: 0,
    userInfo: [],
    title: "",
    content: "",
    CoverList: [],
    author: "",
    loveNum: 0,
    all: []
  },
  async onLoad() {
    var self = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('PageMain_DataA',data => {
      console.log(data);
      self.setData({
        all: data
      })
    })
    var temp = self.data.all.data.length;
    self.setData({
      id: temp
    })
    var app = getApp(); 
    var talkuserName = app.globalData.userName;

    var self = this;
    this.setData({
      author: talkuserName
    })
    console.log(talkuserName); 
  },
  async titleInput(event) {
    console.log(event);
    var text = event.detail.value;
    var self = this;
    self.setData({
      title: text
    })

  },
  async contentInput(event) {
    var text = event.detail.value;
    var self = this;
    self.setData({
      content: text
    })
  },
  async onUpload(file) {
    console.log(file.path);
    this.data.CoverList.push({
      link: file.path
    })
    return new Promise((resolve) => {
      console.log('上传的图片为：', file);
      setTimeout(() => {
        resolve(file.path);
      }, 2000);

    })
  },
  async submit(event) {
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'addPassage',
      data: {
        id: self.data.id,
        title: self.data.title,
        coverList: self.data.CoverList,
        loveNum: 0,
        author: self.data.author,
        content: self.data.content
      },
      success:function(res) {
        console.log(res);
        console.log('成功发布');
        self.setData({
          title: "",
          content: ""
        })
      }
    })
  }

})
Page({
  data:{
    id: 0,
    userInfo: [],
    title: "",
    content: "",
    CoverList: [],
    author: "",
    loveNum: 0,
    all: [],
    // TODO: 获取话题选项数据
    topic: "",
    topicList: ['交流分享', '领养送养', '护理技巧', '新手教学'],
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
  async titleInput(text, event) {
    console.log(event);
    //var text = event.detail.value;
    var self = this;
    self.setData({
      title: text
    })

  },
  async contentInput(text, event) {
   // var text = event.detail.value;
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
  },
  // TODO: 选择话题
  handleOk(value, column) {
    console.log('value', value, 'column', column);
    this.setData({
      topic: value
    })
  },
})
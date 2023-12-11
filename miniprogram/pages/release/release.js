const { resolve } = require("path");

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
    var self = this;
    my.chooseImage({
      success: res => {
        const path = res.apFilePaths[0];
        console.log(path);

        my.uploadFile({
          url: 'https://sm.ms/api/v2/upload', // 开发者服务器地址，此 url 仅为示例
          name: 'smfile',
          filePath: path,
          header: {Authorization: "EhZPkR2NdA5j0shwTt1YLVZaNOTuqPwL"},
          formData: { extra: '其他信息' },
          success: res => {
            my.alert({ title: '上传成功' });
            console.log(res);
            var resJson = JSON.parse(res.data);
            console.log(resJson);
            if (resJson.success){
              self.data.CoverList.push({link: resJson.data.url});
            } else {
              self.data.CoverList.push({link: resJson.images});
            }
          },
        });
      },
  });
    // console.log(file.path);
    // this.data.CoverList.push({
    //   link: file.path
    // })
    // // my.uploadFile({
    // //   url: "https://sm.ms/api/v2/upload",
    // //   filePath: file.path,
    // //   header: {
    // //     "Authorization": "EhZPkR2NdA5j0shwTt1YLVZaNOTuqPwL"
    // //   },
    // //   success: () => {
    // //     console.log(`${path} upload success`);
    // //   },
    // // })
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
    var num = 0;
    for (var i = 0; i < 4; i++) {
      if (this.data.topicList[i] == this.data.topic) {
        break;
      } else {
        num += 1;
      }
    }
    var Id = num.toString() + self.data.id.toString() 
    context.callFunction({
      name: 'addPassage',
      data: {
        Id: Id,
        id: self.data.id,
        title: self.data.title,
        coverList: self.data.CoverList,
        loveNum: 0,
        author: self.data.author,
        content: self.data.content,
        topic: self.data.topic
      },
      success:function(res) {
        console.log(res);
        console.log('成功发布');
        self.setData({
          coverList: [],
          title: "",
          content: "",
          topic: ""
        });
        resolve("");
      }
    })
  },
  // TODO: 选择话题
  handleOk(value, column) {
    console.log('value', value, 'column', column);
    this.setData({
      topic: value
    });
    var temp = 0;
    for (var i = 0; i < this.data.all.data.length; i++ ){
      if (this.data.all.data[i].tuijian.topic == this.data.topic) {
        temp += 1;
      }
    }
    this.setData({
      id: temp
    })
  },
})
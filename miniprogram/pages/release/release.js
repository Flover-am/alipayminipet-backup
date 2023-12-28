const { resolve } = require("path");

Page({
  data:{
    id: 0,
    userInfo: [],
    title: "",
    content: "",
    imageUrls: [], // 图片链接（图床上链接）
    deleteUrls: [], // 删除链接
    filePaths: [], // 图片文件路径
    author: "",
    loveNum: 0,
    all: {
      data: []
    },
    avatar: '',
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
    if (this.data.all.data.length == 0) {
      var self = this;
      console.log("data");
      var context = await my.getCloudContext(); 
      context.callFunction({
        name: 'recommend',
        success:function(res) {
          console.log(res.result);
          self.setData({
            all: {
              data:res.result
            }
          })
          
        }
      });
    }
    // this.data.all.data = self.data.temp;
    console.log(self.data);
    var app = getApp(); 
    console.log(app);
    var talkuserName = app.globalData.nickName;
    console.log(app);
    console.log(talkuserName);
    if (app.globalData.userInfo.code == '40003') {
      my.navigateBack();
      my.alert({
        title: '请先登录认证'
      })
      return;
    }
    if (app.globalData.isLogin == false && (talkuserName.length != 0  || talkuserName != '未登录')) {
      my.alert({
        title: '登录信息失效，请重新登录'
      })
      my.navigateBack();
      return;
    }
    if (talkuserName == '' || talkuserName == '未登录') {
      my.alert({
        title: '请先在“我的”界面点击登录'
      })
      my.navigateBack();
      return;
    }
    var image = app.globalData.avatar;
    console.log(app.globalData);
    var self = this;
    this.setData({
      author: talkuserName,
      avatar: image
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

  // 上传图片: uploader组件用
  async onUploadImage(file) {
    var self = this;
    console.log('upload file: ', file);

    return new Promise((resolve, reject) => {
      // 添加文件路径
      console.log('file path: ', file.path);
      self.data.filePaths.push(file.path);
      console.log(self.data.filePaths)

      // 上传图片至图床
      my.uploadFile({
        url: 'https://sm.ms/api/v2/upload', // 开发者服务器地址，此 url 仅为示例
        name: 'smfile',
        filePath: file.path,
        header: {Authorization: "388atCE4xsvuzZHCV1MeyHXZkAY70axz"},
        formData: { extra: '其他信息' },
        success: res => {
          my.alert({ title: '上传成功' });
          console.log(res);
          var resJson = JSON.parse(res.data);
          console.log(resJson);
          if (resJson.success){
            // 添加图片URL和删除URL
            self.data.imageUrls.push({link: resJson.data.url});
            self.data.deleteUrls.push({link: resJson.data.hash});
            resolve(resJson.data.url)
          } else {
            // 这里是在干什么？
            // 每张图片只能上传 一次，如果重复上传会上传失败返回图片url
            self.data.imageUrls.push({link: resJson.images});
            resolve(resJson.images)
          }
        },
        fail: err => {
          console.log(err)
          reject();
        },
      });
    });
  },

  // 移除图片：uploader组件用
  async onRemoveImage(file) {
    var self = this;
    console.log('remove file: ', file);
    
    return new Promise((resolve) => {
      // 确认弹窗
      my.confirm({
        title: '是否确认移除图片',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        success: (e) => {
          // 通过比较文件路径获取索引，再根据索引获得delete url（好蠢，但是这个方法的参数只有一个file）
          for(var i = 0; i < self.data.filePaths.length; i++){
            if(self.data.filePaths[i] == file.path){
              console.log('delete index:', i);
              console.log('delete url:', self.data.deleteUrls[i].link);
              // TODO: 访问delete url删除图片（get请求）
              var needToDelete = self.data.deleteUrls[i].link;
              var URL = 'https://sm.ms/api/v2/delete/' + needToDelete
              my.request({
                url: URL,
                method: 'GET',
                headers: {
                  "Authorization": "EhZPkR2NdA5j0shwTt1YLVZaNOTuqPwL"
                },
                
                success: function(res) {
                  my.alert('删除成功');
                  console.log(res);
                  console.log('删除成功');
                },
                
              })
              
            }
          }
          resolve(e.confirm);
        }
      });
    })
  },

  async submit(event) {
    var self = this;
    var context = await my.getCloudContext();
    var num = 0;
    var time = (await my.getServerTime()).time;
    var date = new Date(time).toDateString();
    for (var i = 0; i < 4; i++) {
      if (this.data.topicList[i] == this.data.topic) {
        break;
      } else {
        num += 1;
      }
    }
    if (this.data.imageUrls.length == 0 || this.data.content == "" || this.data.title == "") {
      my.alert({
        title: "图片，内容，标题均不可为空！"
      })
      return;
    }
    var Id = parseInt((num + 1).toString() + self.data.id.toString()) ;
    context.callFunction({
      name: 'addPassage',
      data: {
        Id: Id,
        id: self.data.id,
        title: self.data.title,
        imageUrls: self.data.imageUrls,
        loveNum: 0,
        author: self.data.author,
        content: self.data.content,
        topic: self.data.topic,
        avatar: self.data.avatar,
        time: date,
      },
      success:function(res) {
        console.log(res);
        console.log('成功发布');
        self.setData({
          imageUrls: [],
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
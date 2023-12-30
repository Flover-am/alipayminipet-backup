const URL = 'https://demo.antcloud-miniprogram.com';
//需要部署后端并将URL改为后端地址
Page({
  data: {
    nickName: '未登录', //用户昵称
    avatar: '', //用户头像
    userInfo: null,
    isLogin: false, //是否登录
    isAvatar: false, //是否获取头像
    isAvatarLoading: false, //获取头像loading
    isLoginLoading: false ,//
    canIUseAuthButton: my.canIUse('button.open-type.getAuthorize'),
    userGender:"Male",
    year: 10,
    location:"位置",
    todoNum: 0,
    petNum: 0,
    postNum: 0,
    userid:""
  },

  onLoad(){
    
  },

  onShow() {
    if (this.data.isLogin) {
      this.getTodoNum();
      this.getPetsCount();
    }
  },

  async getOpenUserInfo() {
    var self = this;
    my.getOpenUserInfo({
        success: async (res) => {
            await self.getPetsCount();
            await self.getTodoNum();
            this.data.userInfo = JSON.parse(res.response).response
            this.data.isLogin = true;
            this.data.avatar = this.data.userInfo.avatar
            this.data.nickName = this.data.userInfo.nickName
            this.setData(
              {
                nickName:this.data.nickName,
                isLogin:this.data.isLogin,
                avatar:this.data.avatar,
              }
            );
            getApp().globalData.userInfo = JSON.parse(res.response).response;
            getApp().globalData.avatar = this.data.avatar;
            getApp().globalData.nickName = this.data.nickName;
            getApp().globalData.isLogin = true;
        },
        fail: (err) => {
            console.log(err)
        }
    });
  },
  
  toast(message) {
    my.showToast({
      content: message,
      duration: 3000
    });
  },
  toMyPets(){
    console.log("router to mypets")
    this.pageRouter.navigateTo({
      url:"/pages/mypets/mypets"
    })
  },
  onTabTODO(event){
    console.log(event);
    my.switchTab({
      url:"/pages/todo/todo"
    })
  },
  onTabPost(event){
    console.log(event);
    my.switchTab({
      url:"/pages/records/records"
    })
  },
  onTabPostIcon(event){
    var self = this;
    console.log(event);
    this.pageRouter.navigateTo({
      url:"/pages/release/release"
    })
  },
  onTabLikeIcon(event){
    console.log(event);
    my.showToast({
      content: 'TODO：跳转喜欢页',
      duration: 2000
    });
  },
  onTabHistoryIcon(event){
    console.log("router to history")
    this.pageRouter.navigateTo({
      url:"/pages/history/history"
    })
  },
  onTabMessageIcon(event){
    console.log("router to message")
    this.pageRouter.navigateTo({
      url:"/pages/person/message/message"
    })
  },
  onTabSettings(event){
    console.log(event);
    my.showToast({
      content: 'TODO：跳转设置页',
      duration: 2000
    });
  },
  onTabFeedback(event){
    console.log("router to feedback")
    this.pageRouter.navigateTo({
      url:"/pages/feedback/feedback"
    })
  },
  onTabHelp(event){
    console.log(event);
    this.pageRouter.navigateTo({
      url:"/pages/help/help"      
    })
  },
  onTabAbout(event){
    console.log("跳转到关于我们")
    this.pageRouter.navigateTo({
      url:"/pages/about/about"
    })
  },
  async getPetsCount(){
    var context = await my.getCloudContext();
    await this.getOpenId(context);
    var self = this;
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'getPetsCount',
      data:{
        userId: self.data.userid,
      },
      success:function(res){
        console.log(res);
        self.setData({
          petNum:res.result
        })
      }
    })
  },
  async getTodoNum() {
    var context = await my.getCloudContext();
    await this.getOpenId(context);
    context.callFunction({
      name: 'getTodoNum',
      data: {
        userid: this.data.userid
      },
      success: (res) => {
        this.setData({
          todoNum: res.result
        })
      }
    })
  },
  async getOpenId(context) {
    return new Promise((resolve, reject) => {

      context.callFunction({
        name: 'getOpenId',
        data: {},
        success: (res) => {
          this.setData({
            userid: res.result.OPENID
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

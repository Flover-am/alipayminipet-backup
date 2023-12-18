
const URL = 'https://demo.antcloud-miniprogram.com';
//需要部署后端并将URL改为后端地址
Page({
  data: {
    nickname: '账户名', //用户昵称
    avatar: '', //用户头像
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
  },
  getOpenUserInfo() {
    my.getOpenUserInfo({
        success: (res) => {
            let userInfo = JSON.parse(res.response).response
        },
        fail: (err) => {
            console.log(err)
        }
    });
  },
  onLoad(){
    my.showToast({
      content: '页',
      duration: 20000
    });
  },
  toast(message) {
    my.showToast({
      content: message,
      duration: 3000
    });
  },
  onLoad() {
    this.onOpenAPIHandler();
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
    console.log(event);
    my.showToast({
      content: 'TODO：跳转发布页',
      duration: 2000
    });
  },
  onTabLikeIcon(event){
    console.log(event);
    my.showToast({
      content: 'TODO：跳转喜欢页',
      duration: 2000
    });
  },
  onTabHistoryIcon(event){
    console.log(event);
    my.showToast({
      content: 'TODO：跳转历史页',
      duration: 2000
    });
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
    console.log(event);
    my.showToast({
      content: 'TODO：跳转反馈页',
      duration: 2000
    });
  },
  onTabHelp(event){
    console.log(event);
    my.showToast({
      content: 'TODO：跳转帮助页',
      duration: 2000
    });
  },
  onTabAbout(event){
    console.log(event);
    my.showToast({
      content: 'TODO：跳转关于页',
      duration: 2000
    });
  }
});


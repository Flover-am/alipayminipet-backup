Page({
  data: {
    nickname: '账户名', //用户昵称
    avatar: '', //用户头像
    petTime:0,// 养宠时间
    isLogin: false, //是否登录
    isAvatar: false, //是否获取头像
    isAvatarLoading: false, //获取头像loading
    isLoginLoading: false ,//
    pets: []
  },
  onLoad() {
    this.getPetsData();
    var app = getApp(); 
    var nickName = app.globalData.username;
    var avatar = app.globalData.avatar;
    var isLogin = app.globalData.isLogin
    var self = this;
    this.setData({
      nickname: nickName,
      avatar: avatar,
      isLogin: isLogin
    })
  },
  async getPetsData(){
    var self = this;
    var context = await my.getCloudContext();
    my.showLoading({ 
      content: '加载中...',
      delay: '100',
    }); 
    context.callFunction({
      name:'getPets',
      data:{"userid":0},
      success:function(res){
         my.hideLoading();
         console.log(res);
         console.log("success getPets")
         self.setData({
           pets:res.result.data
         });
      },
      fail:function(erro){
        my.hideLoading();
        console.log("error getPets")
        console.log(erro);
        self.setData({
          data:null
        });
      }
    });
  },
  addNewPet(){
    console.log("添加宠物")
    this.pageRouter.navigateTo({
      url:"/pages/mypets/editPet/editPet"
    })
  },
  editPet(){
    console.log("添加宠物")
    this.pageRouter.navigateTo({
      url:"/pages/mypets/editPet/editPet"
    })
  },
  toPetPic(){
    my.showToast({
      type:'none',
      duration:1000,
      content:"跳转到宠物相册//TODO"
    })
  }

});

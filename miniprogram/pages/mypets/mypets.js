Page({
  data: {
    userid:'',//用户id
    nickname: '账户名', //用户昵称
    avatar: '', //用户头像
    petTime:0,// 养宠时间
    isLogin: false, //是否登录
    isAvatar: false, //是否获取头像
    isAvatarLoading: false, //获取头像loading
    isLoginLoading: false ,//
    pets: []
  },
  async onLoad() {
    var app = getApp();
    var context = await my.getCloudContext();
    await this.getOpenId(context);
    var nickName = app.globalData.username;
    var avatar = app.globalData.avatar;
    var isLogin = app.globalData.isLogin
    var self = this;
    this.setData({
      nickname: nickName,
      avatar: avatar,
      isLogin: isLogin
    })
    this.getPetsData();

  },
  async getPetsData(){
    var context = await my.getCloudContext();
    var self = this;
    console.log("userid:"+ self.data.userid);
    my.showLoading({ 
      content: '加载中...',
      delay: '100',
    }); 
    context.callFunction({
      name:'getPets',
      data:{"userid":self.data.userid},
      success:function(res){
         my.hideLoading();
         console.log(res);
         console.log("success getPets")
         self.setData({
           pets:res.result
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
  },
  async getOpenId(context) {
    var self = this
    return new Promise((resolve, reject) => {
      context.callFunction({
        name: 'getOpenId',
        data: {},
            success: (res) => {
              self.setData({
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

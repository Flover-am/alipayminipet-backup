
App({
  globalData:{
    userid:'',
    username:'',
    avatar: '',
    isLogin: false,
    userInfo: [],
    nickName: '',
    canIUseAuthButton: my.canIUse('button.open-type.getAuthorize')
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
  async onLaunch(options) {
    var self = this;
    this.getOpenUserInfo();
        
  
    my.getCloudContext = async function(){
      if(my.fncontext){
        return my.fncontext;
      } else {
        const context = await my.cloud.createCloudContext({
          env: 'env-00jx4sgexxnr'  // 实际开发需要更换为bigpet的env
       });
       await context.init();
       my.fncontext = context;
      }
      return my.fncontext;
    }
  },
   getOpenUserInfo() {
    var self = this;
    my.getOpenUserInfo({
        success: async (res) => {
            // self.getPetsCount();
            this.globalData.userInfo = JSON.parse(res.response).response
            this.globalData.isLogin = true;
            this.globalData.avatar = this.globalData.userInfo.avatar
            this.globalData.nickname = this.globalData.userInfo.nickName
        },
        fail: (err) => {
            console.log(err)
        }
    });
  },

})


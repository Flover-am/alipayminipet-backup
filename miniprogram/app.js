
App({
  globalData:{
    userid:'',
    username:'',
    avatar: '',
    isLogin: false,
    userInfo: [],
    nickName: ''
  },

  async onLaunch(options) {
    var self = this;
    this.getOpenUserInfo();
    my.getOpenUserInfo({
      success: (res) => {
          console.log(JSON.parse(res.response));
          console.log(res);
          var response = JSON.parse(res.response);

          this.globalData.avatar = res.avatar
          this.globalData.username = res.nickName;

        
      },
      fail: (err) => {
          console.log(err)
      }
  });

  
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
            this.globalData.avatar = this.globalData.userInfo.avatar
            this.globalData.nickName = this.globalData.userInfo.nickName
            
        },
        fail: (err) => {
            console.log(err)
        }
    });
  },

})


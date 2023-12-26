
App({
  globalData:{
    userid:'',
    username:'',
    avatar: ''
  },
  async onLaunch(options) {
    var self = this;
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

})

